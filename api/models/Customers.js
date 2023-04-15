/**
 * Customers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fullName: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    phone: {
      type: 'string',
      required: true,
    },
    address: {
      type: 'json',
      required: false,
    },
    notes: {
      type: 'json',
      required: false,
    },
  },

};

