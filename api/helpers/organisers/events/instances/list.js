module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    event: {
      type: 'string',
      required: true,
      description: 'The event to fetch',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser of the event to fetch',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user fetching this event',
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
    return event.instances.map((instance) => {
      return {
        instance: instance.id,
        startDateTime: instance.startDateTime,
        gatesOpenDateTime: instance.gatesOpenDateTime,
        endDateTime: instance.endDateTime,
        gatesCloseDateTime: instance.gatesCloseDateTime,
      };
    });
  },
};
