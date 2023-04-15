module.exports = {
  friendlyName: 'organisers/roles/create',

  description: 'Assigns a user a role for an organiser',

  inputs: {
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user assigning the role',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to assign the role to',
    },
    email: {
      type: 'string',
      required: true,
      description: 'The email address of the user to assign the role to',
    },
    role: {
      type: 'string',
      required: true,
      description: 'The role to assign to the user',
      in: ['Admin'],
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const organiser = await Organisers.findOne({ slug: inputs.organiser });
    await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});

    const uid = await sails.helpers.authentication.organisers.emailToUid.with({
      email: inputs.email,
    });


    const db = Organisers.getDatastore().manager;
    const dbClient = db.client;
    const session = dbClient.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };

    let emailToSend;


    await session.withTransaction(async () => {
      const colOrganiserRoles = db.collection('organiserroles');
      let userHasAcceptedOrganiserRole = false;
      if (uid) {
        if (
          await colOrganiserRoles.findOne(
            { organiser: inputs.organiser, user: uid, accepted: true },
            { session }
          )
        ) {
          userHasAcceptedOrganiserRole = true;
          emailToSend = 'NEW_ROLE';
        } else {
          emailToSend = 'INVITE';
        }

        await colOrganiserRoles.insertOne({
          organiser: inputs.organiser,
          user: uid,
          role: inputs.role,
          accepted: userHasAcceptedOrganiserRole,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        emailToSend = 'INVITE';
        await colOrganiserRoles.insertOne({
          organiser: inputs.organiser,
          user: inputs.email,
          role: inputs.role,
          accepted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }, transactionOptions);


    const invitingUser = await sails.helpers.authentication.organisers.uidToProfile.with({user: inputs.user});
    let user = {
      email: inputs.email
    };
    if (uid) {
      user = await sails.helpers.authentication.organisers.uidToProfile.with({user: uid});
    }
    const inviteData = {
      user: user,
      addingUser: invitingUser,
      role: inputs.role,
      organiser: organiser
    };

    let templates = {
      INVITE: {
        HAS_PROFILE: '643141a9209b386693497029',
        NEW_USER:'6431746c8da0fefc824cd78d'
      },
      NEW_ROLE: {
        HAS_PROFILE: '6431762d8da0fefc824cd78e'
      }
    };
    let userType;
    if (uid) {
      userType = 'HAS_PROFILE';
    } else {
      userType = 'NEW_USER';
    }

    switch (emailToSend) {
      case 'INVITE':
      case 'NEW_ROLE':
        await sails.helpers.communications.email.dispatch.with({
          to: inputs.email,
          template: templates[emailToSend][userType],
          data: inviteData
        });
    }
    return true;
  },
};
