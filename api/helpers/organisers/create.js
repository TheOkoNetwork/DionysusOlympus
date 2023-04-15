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
  friendlyName: 'organisers/create',

  description: 'Create a new event organiser',

  inputs: {
    creator: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating the organiser',
    },
    name: {
      type: 'string',
      required: true,
      description: 'The name of the organiser',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
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
      const colOrganisers = db.collection('organisers');
      const colOrganiserRoles = db.collection('organiserroles');
      while (true) {
        let slugFound = await colOrganisers
          .find({ slug: slug }, { session })
          .toArray();
        if (slugFound.length >= 1) {
          slugIndex++;
          slug = initialSlug + convertToNumberingScheme(slugIndex);
          continue;
        } else {
          await colOrganisers.insertOne({
            name: inputs.name,
            slug: slug,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await colOrganiserRoles.insertOne({
            organiser: slug,
            user: inputs.creator,
            role: 'creator',
            accepted: true,
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
