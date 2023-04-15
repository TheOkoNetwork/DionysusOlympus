/**
 * organisers/create
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    await sails.helpers.organisers.preaccept.with({
      user: res.locals.verifiedJWT.sub,
    });
    const myOrganisers = await sails.helpers.organisers.list.byUser.with({
      user: res.locals.verifiedJWT.sub,
    });
    const unacceptedOrganisers = await sails.helpers.organisers.list.unaccepted.with({
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Returned list of: ${myOrganisers.length} organisers, and ${unacceptedOrganisers.length} unaccepted organisers.`,
      organisers: myOrganisers,
      unaccepted: unacceptedOrganisers
    });
  },
};
