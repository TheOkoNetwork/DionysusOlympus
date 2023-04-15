module.exports = {
  friendlyName: 'Preaccept',

  description: 'Converts any email address organiser role assignments to UID',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user to check for organiser roles for',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const userProfile = await sails.helpers.authentication.organisers.uidToProfile.with({
      user: inputs.user,
    });
    await OrganiserRoles.update({
      user: userProfile.email,
    }).set({
      user: userProfile.uid,
    });
    return true;
  },
};
