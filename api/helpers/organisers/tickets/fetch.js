module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    salesChannel: {
      type: 'string',
      required: true,
      description: 'The sales channel to fetch',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser of the sales channel to fetch',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user fetching this sales channel',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const salesChannel = await SalesChannels.findOne({
      organiser: inputs.organiser,
      slug: inputs.salesChannel,
    });
    if (!salesChannel) {
      throw 'notFound';
    }
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
  },
};
