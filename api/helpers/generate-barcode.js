const RandExp = require('randexp');

module.exports = {


  friendlyName: 'Generate barcode',


  description: '',


  inputs: {
    session: {
      type: 'ref',
      required: false,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let successfullyGeneratedBarcode = false;
    const queryOptions = {};
    if (inputs.session) {
      queryOptions.session = inputs.session;
    }
    while (!successfullyGeneratedBarcode) {
      let barcode = new RandExp(/^[0-9]{18}$/).gen();
      let ticket = await Tickets.findOne({barcode: barcode}, queryOptions);
      if (!ticket) {
        successfullyGeneratedBarcode = true;
        return barcode;
      }
    }
  }


};

