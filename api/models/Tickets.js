/**
 * Tickets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    barcode: {  
      type: 'string',
      required: true,
      unique: true,
      description: 'The barcode of the ticket.',
      example: '012345678912345678'
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser who issued the ticket',
    },
    event: {
      type: 'string',
      required: true,
      description: 'The event the ticket is for',
    },
    eventInstance: {
      type: 'string',
      required: true,
      description: 'The event instance the ticket is for',
    },
    ticketItem: {
      type: 'string',
      required: true,
      description: 'The ticket item the ticket is for',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer who owns the ticket',
    },
    salesChannel: {
      type: 'string',
      required: true,
      description: 'The sales channel the ticket was sold through',
    },
    order: {
      type: 'string',
      required: true,
      description: 'The order the ticket was sold through',
    },
    status: {
      type: 'string',
      required: true,
      description: 'The status of the ticket',
    },
    flags: {
      type: 'json',
      required: true,
      description: 'Any special flags for this ticket',
    },
    ticketHolder: {
      type: 'string',
      required: false,
      description: 'The name of the holder of the ticket',
      allowNull: true,
    }
  },

};

