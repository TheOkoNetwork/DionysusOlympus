module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch access points for',
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

    const accessPoints = await AccessPoints.find({
      organiser: inputs.organiser,
    });
    return accessPoints.map((accessPoint) => {
      return {
        name: accessPoint.name,
        slug: accessPoint.slug,
      };
    });
  },
};
