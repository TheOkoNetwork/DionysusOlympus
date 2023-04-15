const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = {


  friendlyName: 'Format phone number',


  description: '',


  inputs: {
    phoneNumber: {
      type: 'string',
      required: true,
      description: 'The phone number to format',
      example: '7123456789'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,


  fn: function (inputs) {
    return phoneUtil.format(phoneUtil.parseAndKeepRawInput(inputs.phoneNumber, 'GB'),PNF.E164);
  }


}