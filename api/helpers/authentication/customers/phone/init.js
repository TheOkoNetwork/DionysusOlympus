const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {


  friendlyName: 'Init',


  description: 'Init phone.',


  inputs: {
    phoneNumber: {
      type: 'string',
      required: true,
      description: 'Phone number to verify',
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const phoneNumber = sails.helpers.formatPhoneNumber.with({phoneNumber: inputs.phoneNumber});
    const verification = await client.verify.v2.services('VA3f221f9eda5bbf0815a55ee02bffb54c')
    .verifications
    .create({to: phoneNumber, channel: 'sms'});
    sails.log(verification);
    return verification.sid;
  }


};

