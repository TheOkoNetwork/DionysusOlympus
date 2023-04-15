module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch sales channels for',
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

    const salesChannels = await SalesChannels.find({
      organiser: inputs.organiser,
    });
    return salesChannels.map((salesChannel) => {
      return {
        name: salesChannel.name,
        slug: salesChannel.slug,
        type: salesChannel.type,
        domain: salesChannel.domain.map((salesChannelDomain) => {
          return {
            domain: salesChannelDomain.domain,
            verified: salesChannelDomain.verified,
          };
        }),
      };
    });
  },
};
