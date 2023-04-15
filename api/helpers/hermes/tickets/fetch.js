module.exports = {


  friendlyName: 'hermes/tickets/fetch',


  description: 'Fetch ticket',


  inputs: {
    ticket: {
      type: 'string',
      required: true,
      description: 'The ticket to fetch',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer fetching the ticket',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const ticket = await Tickets.findOne({
      customer: inputs.customer,
      id: inputs.ticket,
    });
    if (!ticket) {
      throw 'TicketNotFound';
    }
    const event = await Events.findOne({organiser: ticket.organiser, slug: ticket.event});
    if (!event) {
      throw 'EventNotFound';
    }
    const ticketItem = await TicketItems.findOne({organiser: ticket.organiser,  slug: ticket.ticketItem});
    if (!ticketItem) {
      throw 'TicketItemNotFound';
    }
    return {
      id: ticket.id,
      ticketHolder: ticket.ticketHolder,
      hasTicketHolder: Boolean(ticket.ticketHolder),
      barcode: Boolean(ticket.ticketHolder) ? ticket.barcode : null,
      showBarcode: Boolean(ticket.ticketHolder) ? true: false,
      event: {
        slug: event.slug,
        name: event.name,
      },
      ticketItem: {
        slug: ticketItem.slug,
        name: ticketItem.name,
      },
      gatesOpenDateTime: event.instances.find((instance) => {
        return instance.id === ticket.eventInstance;
      }).gatesOpenDateTime,
      startDateTime: event.instances.find((instance) => {
        return instance.id === ticket.eventInstance;
      }).startDateTime,
      status: ticket.status,
      flags: ticket.flags,
    };
  }


};

