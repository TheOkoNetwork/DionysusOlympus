/**
 * hermes/signin/phone/init
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    const verification = await sails.helpers.authentication.customers.phone.init.with({phoneNumber:req.body.phoneNumber});
    sails.log(verification);
    return res.json({
      status: true,
      message: 'Verification code sent',
      verification: verification
    });
  },
};
