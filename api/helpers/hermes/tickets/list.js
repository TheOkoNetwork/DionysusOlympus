module.exports = {


  friendlyName: 'List',


  description: 'List tickets.',


  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to list tickets for',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer to list tickets for',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const ticketList = await Tickets.find({
      organiser: inputs.organiser,
      customer: inputs.customer,
    });
    const eventsToFetch = [...new Set(ticketList.map(ticket => ticket.event))];
    const events = await Promise.all(eventsToFetch.map((eventSlug) => {
      return Events.findOne({organiser: inputs.organiser, slug: eventSlug});
    }));

    const ticketItemsToFetch = [...new Set(ticketList.map(ticket => ticket.ticketItem))];
    const ticketItems = await Promise.all(ticketItemsToFetch.map((ticketItemSlug) => {
      return TicketItems.findOne({organiser: inputs.organiser,  slug: ticketItemSlug});
    }));
    const tickets = ticketList.map((ticket) => {
      return {
        ...ticket,
        event: events.find((event) => event.slug === ticket.event),
        ticketItem: ticketItems.find((ticketItem) => ticketItem.slug === ticket.ticketItem),
      }
    });
    return tickets.map((ticket) => {
      return {
        id: ticket.id,
        ticketHolder: ticket.ticketHolder,
        hasTicketHolder: Boolean(ticket.ticketHolder),
        event: {
          slug: ticket.event.slug,
          name: ticket.event.name,
        },
        ticketItem: {
          slug: ticket.ticketItem.slug,
          name: ticket.ticketItem.name,
        },
        status: ticket.status,
        flags: ticket.flags,
      }
    });
  }


};

