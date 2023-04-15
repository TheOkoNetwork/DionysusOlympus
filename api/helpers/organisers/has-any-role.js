module.exports = {
  friendlyName: 'Fetch',

  description: '',

  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to fetch',
    },
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
    const organiser = await Organisers.findOne({ slug: inputs.organiser });
    const userHasRoleForOrg = (await OrganiserRoles.find({
      organiser: inputs.organiser,
      user: inputs.user,
    })).length > 0;
    if (!organiser || !userHasRoleForOrg) {
      sails.log({ organiser: inputs.organiser, user: inputs.user });
      sails.log(organiser);
      sails.log(userHasRoleForOrg);
      throw 'notFound';
    }
    return true;
  },
};
