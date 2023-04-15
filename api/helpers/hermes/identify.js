module.exports = {


  friendlyName: 'hermes/identify',


  description: 'Identify sales domain and application configuration for hermes application',


  inputs: {
    domain: {
      type: 'string',
      required: true,
      description: 'Domain name of the sales channel to be looked up'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const db = SalesChannels.getDatastore().manager;
    const colSalesChannel = db.collection('saleschannels');
    const salesChannel = await colSalesChannel.findOne({
      type: 'WEB',
      domain: {
        $elemMatch: {
          domain: inputs.domain,
          verified: true,
        }
      }
    });
    if (salesChannel) {
      return {
        name: salesChannel.name,
        slug: salesChannel.slug,
        organiser: salesChannel.organiser,
      };
    } else {
      return false;
    }
  }


};

