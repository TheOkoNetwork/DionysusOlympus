/**
 * organisers/fetch
 *
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    const organiser = await sails.helpers.organisers.fetch.with({
      user: res.locals.verifiedJWT.sub,
      organiser: req.params.organiser,
    });

    return res.send({
      status: true,
      message: `Returned organiser`,
      organiser: organiser,
    });
  },
};
