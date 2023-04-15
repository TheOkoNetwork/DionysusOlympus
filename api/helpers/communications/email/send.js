const Handlebars = require("handlebars");
const {
  EmailClient,
  KnownEmailSendStatus,
} = require("@azure/communication-email");
const mjml2html = require("mjml");

module.exports = {
  friendlyName: "Email",

  description: "Sends an email in the queue",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function () {
    let emailsNeedingSending = true;
    while (emailsNeedingSending) {
      let emailsToSend = await EmailQueue.find({ status: "PENDING" })
        .sort("updatedAt DESC")
        .limit(1);
      if (!emailsToSend.length) {
        emailsNeedingSending = false;
        continue;
      }

      const connectionString =
        process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];
      const emailClient = new EmailClient(connectionString);

      let queuedEmail = emailsToSend[0];
      queuedEmail.id = require("mongodb").ObjectID(queuedEmail.id);

      const emailTemplate = await EmailTemplates.findOne({
        id: queuedEmail.template,
      });
      if (!emailTemplate) {
        await EmailQueue.getDatastore()
          .manager.collection("emailqueue")
          .updateOne(
            { _id: queuedEmail.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Template with ID: ${queuedEmail.template} not found`,
                },
              },
            }
          );
      }
      let subjectTemplate;
      let htmlBodyTemplate;
      try {
        subjectTemplate = Handlebars.compile(emailTemplate.subjectTemplate);
      } catch (err) {
        await EmailQueue.getDatastore()
          .manager.collection("emailqueue")
          .updateOne(
            { _id: queuedEmail.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Failed compiling subject template, got error from handle bars: ${JSON.stringify(
                    err
                  )}`,
                },
              },
            }
          );
      }

      try {
        htmlBodyTemplate = Handlebars.compile(emailTemplate.htmlBodyTemplate);
      } catch (err) {
        await EmailQueue.getDatastore()
          .manager.collection("emailqueue")
          .updateOne(
            { _id: queuedEmail.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Failed compiling HTML body template, got error from handle bars: ${JSON.stringify(
                    err
                  )}`,
                },
              },
            }
          );
      }

      const emailToSend = {
        to: queuedEmail.to,
        from: queuedEmail.from,
        subject: subjectTemplate(queuedEmail.data),
        html: mjml2html(htmlBodyTemplate(queuedEmail.data)).html,
      };

      const POLLER_WAIT_TIME = 10;
      try {
        const message = {
          senderAddress: emailToSend.from,
          content: {
            subject: emailToSend.subject,
            html: emailToSend.html,
            //plainText: 'This email message is sent from Azure Communication Services Email using the JavaScript SDK.',
          },
          recipients: {
            to: [
              {
                address: emailToSend.to,
                //              displayName: 'Customer Name',
              },
            ],
          },
        };

        const poller = await emailClient.beginSend(message);
        if (!poller.getOperationState().isStarted) {
          console.log("Email poller not started");
          await EmailQueue.getDatastore()
            .manager.collection("emailqueue")
            .updateOne(
              { _id: queuedEmail.id },
              {
                $set: { status: "REJECTED" },
                $push: {
                  log: {
                    createdAt: new Date(),
                    message: `Email poller not started`,
                  },
                },
              }
            );
        }

        let timeElapsed = 0;
        while (!poller.isDone()) {
          poller.poll();
          console.log("Email send polling in progress");

          await new Promise((resolve) =>
            setTimeout(resolve, POLLER_WAIT_TIME * 1000)
          );
          timeElapsed += 10;

          if (timeElapsed > 18 * POLLER_WAIT_TIME) {
            await EmailQueue.getDatastore()
              .manager.collection("emailqueue")
              .updateOne(
                { _id: queuedEmail.id },
                {
                  $set: { status: "REJECTED" },
                  $push: {
                    log: {
                      createdAt: new Date(),
                      message: `Email send polling time out, operation ID: ${
                        poller.getResult().id
                      }`,
                    },
                  },
                }
              );
          }
        }

        if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
          console.log(
            `Successfully sent the email (operation id: ${
              poller.getResult().id
            })`
          );
          await EmailQueue.getDatastore()
            .manager.collection("emailqueue")
            .updateOne(
              { _id: queuedEmail.id },
              {
                $set: { status: "SENT" },
                $push: {
                  log: {
                    createdAt: new Date(),
                    message: `Email sent, operation ID: ${
                      poller.getResult().id
                    }`,
                  },
                },
              }
            );
        } else {
          console.log("Error sending the email");
          await EmailQueue.getDatastore()
            .manager.collection("emailqueue")
            .updateOne(
              { _id: queuedEmail.id },
              {
                $set: { status: "REJECTED" },
                $push: {
                  log: {
                    createdAt: new Date(),
                    message: `Email send polling error:${
                      poller.getResult().error
                    }, operation ID: ${poller.getResult().id}`,
                  },
                },
              }
            );
        }
      } catch (err) {
        console.log(err);
        await EmailQueue.getDatastore()
          .manager.collection("emailqueue")
          .updateOne(
            { _id: queuedEmail.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Email send caught error:${err}`,
                },
              },
            }
          );
      }
    }
  },
};
