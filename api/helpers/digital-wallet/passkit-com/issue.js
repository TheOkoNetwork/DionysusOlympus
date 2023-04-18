module.exports = {


  friendlyName: 'Passkit com issue',


  description: '',


  inputs: {
    ticket: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const ticket = await Tickets.findOne({ id: inputs.ticket });
    if (!ticket) {
      throw new Error('TICKET_NOT_FOUND');
    }
    if (!ticket.ticketHolder) {
      throw new Error('TICKET_NOT_CLAIMED');
    }
    const jwt = sails.helpers.digitalWallet.passkitCom.jwt();
    const issuedPass = await fetch('https://api.pub1.passkit.io/eventTickets/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`,
      },
      body: JSON.stringify({
        eventId: '54Ib1cMT78dylFAaJeQKuH',
        ticketTypeId: '2JUTMp2ZA6rrqF2DNp9xSB',
        barcodeContents: ticket.barcode,
        ticketNumber: ticket.barcode,
        person: {
          forename: ticket.ticketHolder,
          displayName: ticket.ticketHolder,
        },
        metaData: {
          ticketHolder: ticket.ticketHolder
        }
      })
    }).then(res => res.json());

    sails.log(issuedPass);
    if (issuedPass.id) {
      await Tickets.updateOne({ id: ticket.id }).set({digitalWallet: {provider: 'passkit.com', passkitCom: {passId: issuedPass.id}}});
      return issuedPass.id;
    } else {
      throw new Error('Error issuing passkit.io pass');
    }
  }


};
