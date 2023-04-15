function convertToNumberingScheme(number) {
  var baseChar = 'A'.charCodeAt(0);
  var letters = '';

  do {
    number -= 1;
    letters = String.fromCharCode(baseChar + (number % 26)) + letters;
    number = (number / 26) >> 0; // quick `floor`
  } while (number > 0);

  return letters;
}

module.exports = {
  friendlyName: 'organisers/salesChannels/create',

  description: 'Create a new sales channel',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating the sales channel',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to create this sales channel for',
    },
    name: {
      type: 'string',
      required: true,
      description: 'The name of the sales channel to create',
    },
    type: {
      type: 'string',
      required: true,
      description: 'The type of sales channel to create (WEB,API,POS etc..)',
    },
    domain: {
      type: 'string',
      required: false,
      description: 'The domain of the sales channel to create (if applicable)',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const newSalesChannelData = {};
    const validSalesChannelTypes = ['WEB'];
    if (!validSalesChannelTypes.includes(inputs.type)) {
      throw 'invalidSalesChannelType';
    }
    switch (inputs.type) {
      case 'WEB':
        if (!inputs.domain) {
          throw 'missingDomain';
        } else {
          const isHermesSubdomain = inputs.domain
            .toLowerCase()
            .endsWith('.hermes.dionysusticketing.app');
          newSalesChannelData.domain = [
            {
              domain: inputs.domain.toLowerCase(),
              verified: isHermesSubdomain,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
        }
        break;
    }

    const initialSlug = inputs.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .replace(/\W+/g, '')
      .toUpperCase();
    let slug = initialSlug;
    let slugIndex = 0;
    const db = Organisers.getDatastore().manager;
    const dbClient = db.client;
    const session = dbClient.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };
    await session.withTransaction(async () => {
      const colSalesChannels = db.collection('saleschannels');
      if (newSalesChannelData.domain) {
        //query salesChannels, if domain exists in any salesChannel, throw error
        let salesChannelWithDomain = await colSalesChannels
          .find(
            { domain: { $elemMatch: { domain: newSalesChannelData.domain } } },
            { session }
          )
          .toArray();
        if (salesChannelWithDomain.length >= 1) {
          throw 'domainAlreadyExists';
        }
      }

      while (true) {
        let slugFound = await colSalesChannels
          .find({ organiser: inputs.organiser, slug: slug }, { session })
          .toArray();
        if (slugFound.length >= 1) {
          slugIndex++;
          slug = initialSlug + convertToNumberingScheme(slugIndex);
          continue;
        } else {
          await colSalesChannels.insertOne(
            Object.assign(newSalesChannelData, {
              name: inputs.name,
              slug: slug,
              organiser: inputs.organiser,
              type: inputs.type,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          );
          break;
        }
      }
    }, transactionOptions);
    return slug;
  },
};
