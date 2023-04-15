/**
 * hermes/signin/phone/complete
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    const signInData = await sails.helpers.authentication.customers.phone.complete.with({phoneNumber:req.body.phoneNumber, mfaCode: req.body.mfaCode, salesChannel: req.body.salesChannel,organiser: req.body.organiser});
    sails.log(signInData);
    if (!signInData) {
      return res.json({
        status: false,
        message: 'Verification failed, please check the entered code is correct',
      });
    };
    return res.json({
      status: true,
      message: 'Verification complete',
      signInData: signInData
    });
  },
};
