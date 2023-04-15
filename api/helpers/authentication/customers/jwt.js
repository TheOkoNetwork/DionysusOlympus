const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Jwt',


  description: 'Jwt customers.',


  inputs: {
    jwt: {
      type: "string",
      required: true,
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
    return jwt.verify(inputs.jwt, JWTKey);
  }


};

