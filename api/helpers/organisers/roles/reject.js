module.exports = {
  friendlyName: 'organisers/roles/reject',

  description: 'Reject a role assignment for an organiser',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user rejecting the role',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser of the role to reject',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const rolesNeedingRejecting = await OrganiserRoles.find({
      organiser: inputs.organiser,
      user: inputs.user,
      accepted: false,
    });
    if (!rolesNeedingRejecting.length) {
      throw 'noRolesNeedingRejecting';
    }
    await OrganiserRoles.destroy({
      organiser: inputs.organiser,
      user: inputs.user,
      accepted: false,
    });
    return true;
  },
};
