module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user to get organisers for',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const organiser = await Organisers.findOne({ slug: inputs.organiser });
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    return {
      name: organiser.name,
      slug: organiser.slug,
    };
  },
};
