const crypto = require('crypto');

module.exports = {
  friendlyName: 'organisers/events/instances/create',

  description: '',

  inputs: {
    event: {
      type: 'string',
      required: true,
      description: 'The event to create this instance for',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser of the event',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating this event instance',
    },
    startDateTime: {
      type: 'string',
      required: true,
      description: 'The start dateTime of the event instance',
    },
    gatesOpenDateTime: {
      type: 'string',
      required: true,
      description: 'The gates open dateTime of the event instance',
    },
    endDateTime: {
      type: 'string',
      required: true,
      description: 'The end dateTime of the event instance',
    },
    gatesCloseDateTime: {
      type: 'string',
      required: true,
      description: 'The gates close dateTime of the event instance',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const event = await Events.findOne({
      organiser: inputs.organiser,
      slug: inputs.event,
    });
    if (!event) {
      throw 'notFound';
    }

    colEvents = Events.getDatastore().manager.collection('events');
    const instanceID = crypto.randomUUID();
    //update colEvents push the event start/end gate open/close times to the datetime array
    colEvents.updateOne(
      { organiser: inputs.organiser, slug: inputs.event },
      {
        $push: {
          instances: {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: instanceID,
            startDateTime: inputs.startDateTime,
            gatesOpenDateTime: inputs.gatesOpenDateTime,
            endDateTime: inputs.endDateTime,
            gatesCloseDateTime: inputs.gatesCloseDateTime,
          },
        },
      }
    );

    return {
      instance: instanceID,
    };
  },
};
