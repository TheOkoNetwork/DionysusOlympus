module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch imported ticket sales for',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user',
    },
    saleProduct: {
      type: 'string',
      required: true,
      description: 'The sold product imported ticket sales for',
    },
    ticketItem: {
      type: 'string',
      required: true,
      description: 'The ticket item to issue',
    },
    salesChannel: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const importedTicketSales = await ImportedTicketSales.find({
      organiser: inputs.organiser,
      saleProduct: inputs.saleProduct,
      status: 'PENDING',
    });
    for (const importedTicketSale of importedTicketSales) {
      await ImportedTicketSales.updateOne({
        id: importedTicketSale.id,
      }).set({
        status: 'PROCESSING',
        ticketItem: inputs.ticketItem,
        salesChannel: inputs.salesChannel
      });
    }
    return true;
  }
};
