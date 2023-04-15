module.exports = {
  friendlyName: 'By user',

  description: '',

  inputs: {
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
    const db = Organisers.getDatastore().manager;
    const agg = [
      {
        $match: {
          accepted: true,
        },
      },
      {
        $addFields: {
          userOrganiser: {
            $concat: ['$user', '$organiser'],
          },
        },
      },
      {
        $group: {
          _id: '$user',
          organisers: {
            $addToSet: '$organiser',
          },
        },
      },
      {
        $match: {
          _id: inputs.user,
        },
      },
    ];
    const coll = db.collection('organiserroles');
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    return await Promise.all(
      result
        .map((r) => r.organisers)
        .flat()
        .map((slug) => Organisers.findOne({ slug: slug }))
    ).then((organisers) =>
      organisers.map((organiser) => {
        return {
          name: organiser.name,
          slug: organiser.slug,
        };
      })
    );
  },
};
