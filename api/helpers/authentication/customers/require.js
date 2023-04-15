module.exports = {
  friendlyName: 'authentication/customers/require',

  description:
    'Require incoming request to have a token associated with a customer NOT a organiser',

  inputs: {
    req: {
      type: 'ref',
      description: 'The incoming request (req).',
      required: true,
    },
    res: {
      type: 'ref',
      description: 'The server response object (res).',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const { req, res } = inputs;
    //trigger JWT verification
    await sails.helpers.authentication.jwt.with({ req, res });
    //check if the user is a customer
    if (res.locals.verifiedJWT.userType !== 'customer') {
      throw 'unauthorized';
    }
    return true;
  },
};
