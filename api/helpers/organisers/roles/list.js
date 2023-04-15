module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch roles for',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user fetching roles',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const organiserRoles = await OrganiserRoles.find({
      organiser: inputs.organiser,
    });
    const userProfiles = await Promise.all(
      [
        ...new Set(
          organiserRoles.map((organiserRole) => {
            return organiserRole.user;
          })
        ),
      ].filter((user) => {
        return !user.includes('@');
      }).map((user) => {
        return sails.helpers.authentication.organisers.uidToProfile.with({
          user: user,
        });
      })
    );
    return organiserRoles.map((organiserRole) => {
      const usrRole = {
        user: userProfiles.find((userProfile) => {
          return userProfile.uid === organiserRole.user;
        }) || {
          name: organiserRole.user,
          email: organiserRole.user
        },
        role: organiserRole.role,
        accepted: organiserRole.accepted,
      };

      if (!usrRole.accepted) {
        usrRole.user.name = usrRole.user.email;
      }
      return usrRole;
    });
  },
};
