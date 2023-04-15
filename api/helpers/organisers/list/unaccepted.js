function convertArrayToObject(arr) {
  const obj = {};
  arr.forEach(item => {
    const key = Object.keys(item)[0];
    obj[key] = item[key];
  });
  return obj;
}


module.exports = {
  friendlyName: 'Unaccepted',

  description: '',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user to get unaccepted organisers for',
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
          accepted: false,
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
    const unacceptedOrganisers = result
    .map((r) => r.organisers)
    .flat();
    const unacceptedRoleAssignments = await OrganiserRoles.find({
      user: inputs.user,
      accepted: false,
    });
    const unacceptedRoles = unacceptedRoleAssignments.map((roleAssignment) => {
      return {
        role: roleAssignment.role,
        organiser: roleAssignment.organiser,
      };
    });

    const unacceptedOrganiserRoles = convertArrayToObject(unacceptedOrganisers.map((organiser) => {
      return {
        [organiser]: unacceptedRoles.filter((role) => {
          return role.organiser === organiser;
        }).map((role) => {
          return role.role;
        })
      };
    }));

    return await Promise.all(
      unacceptedOrganisers
        .map((slug) => Organisers.findOne({ slug: slug }))
    ).then((organisers) =>
      organisers.map((organiser) => {
        return {
          name: organiser.name,
          slug: organiser.slug,
          roles: unacceptedOrganiserRoles[organiser.slug],
        };
      })
    );
  },
};
