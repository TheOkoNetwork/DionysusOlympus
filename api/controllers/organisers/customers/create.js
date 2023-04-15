/**
 * organisers/customers/create
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    const createdCustomerID =
      await sails.helpers.organisers.customers.create.with({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        organiser: req.params.organiser,
        user: res.locals.verifiedJWT.sub,
      });

    return res.send({
      status: true,
      message: `Successfully created customer`,
      createdCustomerID: createdCustomerID,
    });
  },
};
