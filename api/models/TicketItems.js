/**
 * TicketItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    event: {
      type: 'string',
      required: true,
    },
    eventInstances: {
      type: 'json',
      required: true,
    },
    accessPoints: {
      type: 'json',
      required: true,
    },
    itemType: {
      type: 'string',
      required: true,
    }
  },

};

