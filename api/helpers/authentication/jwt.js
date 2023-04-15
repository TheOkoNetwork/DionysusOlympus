module.exports = {
  friendlyName: 'Jwt',

  description: 'Jwt authentication.',

  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true,
    },
    res: {
      type: 'ref',
      description: 'The current outgoing response (res).',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    let verifiedJWT;
    const { req, res } = inputs;

    const jwt = req.headers.authorization.split('Bearer ')[1];
    const jwtIss = JSON.parse(atob(jwt.split('.')[1])).iss;

    switch (jwtIss) {
      case 'https://dionysusticketing.b2clogin.com/c2277087-7c4e-418c-be8d-6dcb50b783e7/v2.0/':
        console.log('B2C token - Organiser');
        verifiedJWT = await sails.helpers.authentication.organisers.azureB2C(
          jwt
        );
        verifiedJWT.userType = 'organiser';
        break;
      case 'https://olympus.dionysusticketing.app':
        console.log('Olympus issued JWT - Customer');
        verifiedJWT = await sails.helpers.authentication.customers.jwt(jwt);
        verifiedJWT.userType = 'customer';
        break;
    }
    res.locals.verifiedJWT = verifiedJWT;
    return verifiedJWT;
  },
};
