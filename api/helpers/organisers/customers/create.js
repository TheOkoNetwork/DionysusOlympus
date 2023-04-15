module.exports = {
  friendlyName: 'organisers/customers/create',

  description: 'Create a new customer',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user creating the customer',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to create',
    },
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    address: {
      type: 'json',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    if (inputs.user !== 0 && inputs.user !== '0') {
      await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});
    }
    const db = Organisers.getDatastore().manager;
    const dbClient = db.client;
    const session = dbClient.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };
    let createdCustomerID;
    const phoneNumber = sails.helpers.formatPhoneNumber.with({phoneNumber: inputs.phone});
    await session.withTransaction(async () => {
      const colCustomers = db.collection('customers');
      let existingCustomer = await colCustomers
          .find({ organiser: inputs.organiser, $or: [ { phone: phoneNumber }, { email: inputs.email } ] }, { session })
          .toArray();
      if (existingCustomer.length >= 1) {
        throw 'customerExists';
      } else {
        const createdCustomerDoc = await colCustomers.insertOne({
          fullName: inputs.fullName,
          email: inputs.email,
          phone: phoneNumber,
          address: inputs.address,
          notes: [
            {
              user: inputs.user,
              note: 'Customer created',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          organiser: inputs.organiser,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        createdCustomerID = createdCustomerDoc.insertedId.toString();
      }
    }, transactionOptions);
    return createdCustomerID;
  },
};
