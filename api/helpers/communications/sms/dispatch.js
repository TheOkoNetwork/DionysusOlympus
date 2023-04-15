module.exports = {
  friendlyName: 'sms',

  description: 'Queues an SMS to be sent.',

  inputs: {
    to: {
      type: 'string',
      required: true,
      description: 'The phone number to send the text to',
    },
    from: {
      type: 'string',
      defaultsTo: 'Dionysus',
      description: 'The sender ID to send the text from',
    },
    template: {
      type: 'string',
      required: true,
      description: 'The ID of the template to use.',
    },
    data: {
      type: 'json',
      required: true,
      description: 'The data to use when rendering the template.',
    },
    organiser: {
      type: 'string',
      allowNull: true,
      description:
        'The organiser that this text is being sent for, null if being sent on behalf of Dionysus itself',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    // Check if the template exists
    let template = await SMSTemplates.findOne({
      id: inputs.template,
      organiser: inputs.organiser,
    });
    let initialSMSStatus = 'PENDING';
    const initalSMSLog = [
      {
        createdAt: new Date(),
        message: 'SMS being queued',
      },
    ];
    if (!template) {
      initialSMSStatus = 'REJECTED';
      initalSMSLog.push({
        createdAt: new Date(),
        message: 'Template not found',
      });
    }

    // Queues the email
    const queuedSMS = await SMSQueue.create({
      template: inputs.template,
      to: inputs.to,
      from: inputs.from,
      data: inputs.data,
      status: initialSMSStatus,
      log: initalSMSLog,
    }).fetch();
    return queuedSMS.id;
  },
};
