module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    accessPoint: {
      type: 'string',
      required: true,
      description: 'The access point to fetch',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser of the access point to fetch',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user fetching this access point',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const accessPoint = await AccessPoints.findOne({
      organiser: inputs.organiser,
      slug: inputs.accessPoint,
    });
    if (!accessPoint) {
      throw 'notFound';
    }
    return {
      name: accessPoint.name,
      slug: accessPoint.slug,
    };
  },
};
