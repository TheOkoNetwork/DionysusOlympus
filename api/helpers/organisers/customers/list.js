module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch customers for',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const customers = await Customers.find({
      organiser: inputs.organiser,
    });
    return customers.map((customer) => {
      return {
        id: customer.id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        postcode: customer.address ? customer.address.postcode : '',
      };
    });
  },
};
