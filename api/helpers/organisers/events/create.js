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
  friendlyName: 'organisers/events/create',

  description: 'Create a new event',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating the event',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to create',
    },
    timezone: {
      type: 'string',
      required: true,
      description: 'The time zone of the event',
    },
    name: {
      type: 'string',
      required: true,
      description: 'The name of the event to create',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});


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
      const colEvents = db.collection('events');
      while (true) {
        let slugFound = await colEvents
          .find({ organiser: inputs.organiser, slug: slug }, { session })
          .toArray();
        if (slugFound.length >= 1) {
          slugIndex++;
          slug = initialSlug + convertToNumberingScheme(slugIndex);
          continue;
        } else {
          await colEvents.insertOne({
            name: inputs.name,
            slug: slug,
            timezone: inputs.timezone,
            organiser: inputs.organiser,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          break;
        }
      }
    }, transactionOptions);
    return slug;
  },
};
