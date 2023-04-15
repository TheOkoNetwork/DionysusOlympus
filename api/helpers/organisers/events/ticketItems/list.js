module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch events for',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});
    const event = await Events.findOne({organiser: inputs.organiser, slug: inputs.event});
    if (!event) {
      throw 'notFound';
    }

    const ticketItems = await TicketItems.find({ organiser: inputs.organiser,event: inputs.event });
    return ticketItems.map((ticketItem) => {
      return {
        name: ticketItem.name,
        description: ticketItem.description,
        slug: ticketItem.slug,
      };
    });
  },
};
