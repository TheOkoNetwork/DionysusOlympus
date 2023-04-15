
const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Refresh',


  description: 'Refresh hermes.',


  inputs: {
    jwt: {
      type: 'string',
      required: true,
      description: 'JWT token to validate and maybe refresh'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const JWTKey = process.env['CUSTOMER_JWT_KEY'];
    if (!JWTKey) {
      throw 'JWTNotConfigured';
    }
    const existingJWT = jwt.verify(inputs.jwt, JWTKey);
    const customer = await Customers.findOne({id: existingJWT.sub});
    if (!customer) {
      return false;
    }
    const token = await sails.helpers.hermes.jwt.with({phoneNumber: customer.phone, salesChannel: existingJWT.salesChannel, organiser: existingJWT.organiser});
    return token;
  }


};

