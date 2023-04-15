/**
 * EmailQueue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    template: {
      type: "string",
      required: true,
    },
    to: {
      type: "string",
      required: true,
    },
    from: {
      type: "string",
      required: true,
    },
    data: {
      type: "json",
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
    log: {
      type: "json",
      defaultsTo: [],
    },
  },
};
