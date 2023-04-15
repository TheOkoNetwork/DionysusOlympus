module.exports = {


  friendlyName: 'hermes/tickets/claim',


  description: 'Claim ticket',


  inputs: {
    ticket: {
      type: 'string',
      required: true,
      description: 'The ticket to fetch',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer claiming the ticket',
    },
    ticketHolder: {
      type: 'string',
      required: true,
      description: 'The ticket holder claiming this ticket',
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
    if (ticket.flags.blockClaim) {
      throw 'TicketClaimBlocked';
    }

    await Tickets.update({
      id: ticket.id,
    }, {
      ticketHolder: inputs.ticketHolder,
      barcode: await sails.helpers.generateBarcode(),
      status: 'CLAIMED'
    });
    return true;
  }


};

