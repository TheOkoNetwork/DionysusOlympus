/**
 * PhoneVerificationRequests.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    phoneNumber: {
      type: 'string',
      required: true,
      description: 'Phone number to verify',
    },
    channel: {
      type: 'string',
      required: true,
      description: 'Channel to send verification via',
    },
    status: {
      type: 'string',
      required: true,
      description: 'Status of verification',
    },
    sid: {
      type: 'string',
      required: false,
      description: 'Twilio SID of verification',
      allowNull: true,
    },

  },

};

