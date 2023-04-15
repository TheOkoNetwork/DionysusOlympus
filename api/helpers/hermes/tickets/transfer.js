module.exports = {


  friendlyName: 'hermes/tickets/transfer',


  description: 'Transfer ticket',


  inputs: {
    ticket: {
      type: 'string',
      required: true,
      description: 'The ticket to fetch',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer transfering the ticket',
    },
    phone: {
      type: 'string',
      required: true,
      description: 'The phone number to transfer the ticket to',
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
    const phone = await sails.helpers.formatPhoneNumber(inputs.phone);
    const receivingCustomer = await Customers.findOne({
      phone,
      organiser: ticket.organiser,
    });
    if (!receivingCustomer) {
      throw 'CustomerNotFound';
    }
    if (ticket.flags.blockTransfer) {
      throw 'TicketTransferBlocked';
    }

    await Tickets.update({
      id: ticket.id,
    }, {
      customer: receivingCustomer.id,
      ticketHolder: '',
      barcode: await sails.helpers.generateBarcode(),
      status: 'TRANSFERRED'
    });
    return true;
  }


};

