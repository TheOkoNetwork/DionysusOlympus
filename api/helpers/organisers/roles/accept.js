module.exports = {
  friendlyName: 'organisers/roles/accept',

  description: 'Accept a role assignment for an organiser',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user accepting the role',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to assign the role to',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const rolesNeedingAccepting = await OrganiserRoles.find({
      organiser: inputs.organiser,
      user: inputs.user,
      accepted: false,
    });
    if (!rolesNeedingAccepting.length) {
      throw 'noRolesNeedingAccepting';
    }
    await OrganiserRoles.update({
      organiser: inputs.organiser,
      user: inputs.user,
      accepted: false,
    }).set({
      accepted: true,
    });
    return true;
  },
};
