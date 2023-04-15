module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: { },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function () {
    const importedTicketSales = await ImportedTicketSales.find({
      status: 'PROCESSING',
    });
    const db = ImportedTicketSales.getDatastore().manager;
    for (const importedTicketSale of importedTicketSales) {
      sails.log(`Processing imported ticket sale ${importedTicketSale.id}`);
      const {
        purchaserFirstName,
        purchaserLastName,
        purchaserEmail,
        purchaserPhoneNumber,
        saleQTY,
        user,
        externalOrderID,
        externalOrderSource,
        organiser,
        ticketItem,
        salesChannel
      } = importedTicketSale;
      const phoneNumber = await sails.helpers.formatPhoneNumber.with({phoneNumber: purchaserPhoneNumber});
      const existingCustomerForSale = await Customers.findOne({
        organiser: organiser,
        phone: phoneNumber
      });
      let customerID;
      if (existingCustomerForSale) {
        customerID = existingCustomerForSale.id;
      } else {
        customerID = await sails.helpers.organisers.customers.create.with({
          organiser: organiser,
          fullName: purchaserFirstName + ' ' + purchaserLastName,
          email: purchaserEmail,
          phone: phoneNumber,
          user: user,
        });
      }
      console.log(customerID);
      const ticketItemData = await TicketItems.findOne({slug: ticketItem, organiser: organiser});
      const event  = await Events.findOne({slug: ticketItemData.event, organiser: organiser});

      const issuedTicketOrderID =
      await sails.helpers.organisers.tickets.create.with({
        ticketItem: ticketItem,
        qty: saleQTY,
        customer: customerID,
        salesChannel: salesChannel,
        eventInstance: event.instances[0].id,
        organiser: organiser,
        user: user,
        externalOrderID,
        externalOrderSource,
      });
      sails.log({
        id: String(importedTicketSale.id),
      });
      await db.collection('importedticketsales').updateOne({
        _id: require('mongodb').ObjectID(importedTicketSale.id),
      }, {
        $set: {
          status: 'PROCESSED',
          order: issuedTicketOrderID,
        }
      });
    }
    return "OK";
  }
};
