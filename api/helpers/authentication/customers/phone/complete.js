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
    },
    mfaCode: {
      type: 'string',
      required: true,
      description: 'MFA code to verify',
    },
    salesChannel: {
      type: 'string',
      required: true,
      description: 'Sales channel to verify customer sign in to',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'Organiser to verify customer sign in to',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const phoneNumber = sails.helpers.formatPhoneNumber.with({phoneNumber: inputs.phoneNumber});
    try {
      const verification = await client.verify.v2.services('VA3f221f9eda5bbf0815a55ee02bffb54c')
    .verificationChecks
    .create({to: phoneNumber, code: inputs.mfaCode});
      sails.log(verification);
      if (verification.status === 'approved') {
        await PhoneVerificationRequests.update({phoneNumber: phoneNumber, sid: verification.sid}, {status: 'approved'});
        return await sails.helpers.hermes.jwt.with({phoneNumber: phoneNumber, salesChannel: inputs.salesChannel, organiser: inputs.organiser});
      } else {
        return false;
      }
    } catch (error) {
      sails.log(error);
      return false;
    }
  }


};

