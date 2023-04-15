/**
 * Tickets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    externalOrderID: {
      type: 'string',
      required: true,
    },
    purchaserFirstName: {
      type: 'string',
      required: true,
    },
    purchaserLastName: {
      type: 'string',
      required: true,
    },
    purchaserEmail: {
      type: 'string',
      required: true,
    },
    purchaserPhoneNumber: {
      type: 'string',
      required: true,
    },
    saleProduct: {
      type: 'string',
      required: true,
    },
    saleQTY: {
      type: 'string',
      required: true,
    },
    user: {
      type: 'string',
      required: true,
    },
    externalOrderSource: {
      type: 'string',
      required: true,
    },
    organiser: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      required: true
    },
    ticketItem: {
      type: 'string',
      required: false,
    },
    salesChannel: {
      type: 'string',
      required: false,
    },
    order: {
      type: 'string',
      required: false,
    }
  },

};

