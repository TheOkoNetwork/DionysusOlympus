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
    });
    return importedTicketSales.map((importedTicketSale) => {
      return {
        externalOrderID: importedTicketSale.externalOrderID,
        purchaserFirstName: importedTicketSale.purchaserFirstName,
        purchaserLastName: importedTicketSale.purchaserLastName,
        purchaserEmail: importedTicketSale.purchaserEmail,
        purchaserPhoneNumber: importedTicketSale.purchaserPhoneNumber,
        saleProduct: importedTicketSale.saleProduct,
        saleQTY: importedTicketSale.saleQTY,
        user: importedTicketSale.user,
        externalOrderSource: importedTicketSale.externalOrderSource,
        organiser: importedTicketSale.organiser,
        status: importedTicketSale.status,
      };
    });
  },
};
