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
  friendlyName: 'organisers/events/ticketItems/create',

  description: 'Create a new ticket item',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating the ticket item',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to create this item for',
    },
    name: {
      type: 'string',
      required: true,
      description: 'The name of the ticket item to create',
    },
    description: {
      type: 'string',
      required: true,
      description: 'The description of the ticket item to create',
    },
    event: {
      type: 'string',
      required: true,
      description: 'The event to create this item for',
    },
    eventInstances: {
      type: 'json',
      required: true,
      description: 'The event instances of the ticket item to create for, array of instance IDs',
    },
    accessPoints: {
      type: 'json',
      required: true,
      description: 'The access points of the ticket item to create is valid at, array of access point IDs',
    },
    itemType: {
      type: 'string',
      required: true,
      description: 'The type of ticket item to create',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});
    const event = await Events.findOne({organiser: inputs.organiser, slug: inputs.event});
    if (!event) {
      throw 'notFound';
    }

    const initialSlug = inputs.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .replace(/\W+/g, '')
      .toUpperCase();
    let slug = `${event.slug}-${initialSlug}`;
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
      const colTicketItems = db.collection('ticketitems');
      while (true) {
        let slugFound = await colTicketItems
          .find({ organiser: inputs.organiser, slug: slug }, { session })
          .toArray();
        if (slugFound.length >= 1) {
          slugIndex++;
          slug = initialSlug + convertToNumberingScheme(slugIndex);
          continue;
        } else {
          await colTicketItems.insertOne({
            name: inputs.name,
            description: inputs.description,
            slug: slug,
            event: inputs.event,
            eventInstances: inputs.eventInstances,
            accessPoints: inputs.accessPoints,
            itemType: inputs.itemType,
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
