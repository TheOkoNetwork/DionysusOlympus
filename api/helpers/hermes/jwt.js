const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Jwt',


  description: 'Jwt hermes.',


  inputs: {
    organiser: {
      type: 'string',
      required: true,
      description: 'Organiser of the customer sign in request',
    },
    salesChannel: {
      type: 'string',
      required: true,
      description: 'Sales channel of the customer sign in request',
    },
    phoneNumber: {
      type: 'string',
      required: true,
      description: 'Phone number of the customer sign in request',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const phoneNumber = sails.helpers.formatPhoneNumber.with({phoneNumber: inputs.phoneNumber});

    const salesChannel = await SalesChannels.findOne({slug: inputs.salesChannel});
    if (!salesChannel) {
      throw 'salesChannelNotFound';
    }
    const organiser = await Organisers.findOne({slug: inputs.organiser});
    if (!organiser) {
      throw 'organiserNotFound';
    }
    let customer = await Customers.findOne({organiser: organiser.slug, phone: phoneNumber});
    if (!customer) {
      await Customers.create({
        organiser: organiser.slug,
        phone: phoneNumber,
      });
      return sails.helpers.hermes.jwt.with({organiser: organiser.slug, salesChannel: salesChannel.slug, phoneNumber: phoneNumber});
    }
    const JWTKey = process.env['CUSTOMER_JWT_KEY'];
    if (!JWTKey) {
      throw 'JWTNotConfigured';
    }

    const token = jwt.sign({
      iss: 'https://olympus.dionysusticketing.app',
      sub: customer.id,
      organiser: organiser.slug,
      salesChannel: salesChannel.slug,
    }, JWTKey, { expiresIn: '30d' });
    return {
      token: token,
      customer: {
        id: customer.id,
        fullName: customer.fullName,
      }
    };
  }


};

