const azureJWT = require("azure-jwt-verify");

module.exports = {
  friendlyName: "Azure b 2 c",

  description: "",

  inputs: {
    jwt: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const config = {
      JWK_URI:
        "https://dionysusticketing.b2clogin.com/dionysusticketing.onmicrosoft.com/discovery/v2.0/keys?p=B2C_1_SigninOnly",
      ISS: "https://dionysusticketing.b2clogin.com/c2277087-7c4e-418c-be8d-6dcb50b783e7/v2.0/",
      //AUD: '81173864-6ca0-4380-b943-63fe7e4a519f'
    };
    const decodedJWTRes = await azureJWT.verify(inputs.jwt, config);
    const decodedJWT = JSON.parse(decodedJWTRes).message;
    return decodedJWT;
  },
};
