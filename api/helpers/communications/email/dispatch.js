module.exports = {
  friendlyName: "Email",

  description: "Queues an email to be sent.",

  inputs: {
    to: {
      type: "string",
      required: true,
      description: "The email address to send the email to.",
    },
    from: {
      type: "string",
      defaultsTo: "donotreply@dionysusticketing.app",
      description: "The email address to send the email from.",
    },
    template: {
      type: "string",
      required: true,
      description: "The ID of the template to use.",
    },
    data: {
      type: "json",
      required: true,
      description: "The data to use when rendering the template.",
    },
    organiser: {
      type: "string",
      allowNull: true,
      description:
        "The organiser that this email is being sent for, null if being sent on behalf of Dionysus itself",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    // Check if the template exists
    let template = await EmailTemplates.findOne({
      id: inputs.template,
      organiser: inputs.organiser,
    });
    let initialEmailStatus = "PENDING";
    const initalEmailLog = [
      {
        createdAt: new Date(),
        message: "Email being queued",
      },
    ];
    if (!template) {
      initialEmailStatus = "REJECTED";
      initalEmailLog.push({
        createdAt: new Date(),
        message: "Template not found",
      });
    }

    // Queues the email
    const queuedEmail = await EmailQueue.create({
      template: inputs.template,
      to: inputs.to,
      from: inputs.from,
      data: inputs.data,
      status: initialEmailStatus,
      log: initalEmailLog,
    }).fetch();
    return queuedEmail.id;
  },
};
