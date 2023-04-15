const Handlebars = require("handlebars");
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  friendlyName: "SMS",

  description: "Sends an SMS in the queue",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function () {
    let SMSNeedingSending = true;
    while (SMSNeedingSending) {
      let SMSsToSend = await SMSQueue.find({ status: "PENDING" })
        .sort("updatedAt DESC")
        .limit(1);
      if (!SMSsToSend.length) {
        SMSNeedingSending = false;
        continue;
      }

      let queuedSMS = SMSsToSend[0];
      queuedSMS.id = require("mongodb").ObjectID(queuedSMS.id);

      const SMSTemplate = await SMSTemplates.findOne({
        id: queuedSMS.template,
      });
      if (!SMSTemplate) {
        await SMSQueue.getDatastore()
          .manager.collection("smsqueue")
          .updateOne(
            { _id: queuedSMS.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Template with ID: ${queuedSMS.template} not found`,
                },
              },
            }
          );
      }
      let template;
      try {
        template = Handlebars.compile(SMSTemplate.template);
      } catch (err) {
        await SMSQueue.getDatastore()
          .manager.collection("smsqueue")
          .updateOne(
            { _id: queuedSMS.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Failed compiling template, got error from handle bars: ${JSON.stringify(
                    err
                  )}`,
                },
              },
            }
          );
      }

      const SMSToSend = {
        to: queuedSMS.to,
        from: queuedSMS.from,
        body: template(queuedSMS.data),
      };

      try {
        const sentMessage = await client.messages.create({
          body: SMSToSend.body,
          from: SMSToSend.from,
          to: SMSToSend.to,
        });
        await SMSQueue.getDatastore()
          .manager.collection("smsqueue")
          .updateOne(
            { _id: queuedSMS.id },
            {
              $set: { status: "SENT" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `SMS sent successfully, Twilio message SID: ${sentMessage.sid}`,
                },
              },
            }
          );
      } catch (err) {
        sails.log(err);
        await SMSQueue.getDatastore()
          .manager.collection("smsqueue")
          .updateOne(
            { _id: queuedSMS.id },
            {
              $set: { status: "REJECTED" },
              $push: {
                log: {
                  createdAt: new Date(),
                  message: `Failed sending SMS, got error from Twilio: ${err}`,
                },
              },
            }
          );
      }
    }
  },
};
