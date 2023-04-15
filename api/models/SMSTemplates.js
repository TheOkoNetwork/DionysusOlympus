/**
 * SMSTemplates.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    template: {
      type: "string",
      required: true,
    },
    organiser: {
      type: "string",
      required: false,
      allowNull: true,
      description:
        "The organiser that this template belongs to. If null, this template is available to all organisers.",
    },
  },
};
