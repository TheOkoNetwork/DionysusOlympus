/**
 * AccessPoints.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    organiser: { type: "string", required: true },
    name: { type: "string", required: true },
    slug: { type: "string", required: true },
  },
};
