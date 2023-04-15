/**
 * organisers/accessPoints/fetch
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
    const accessPoint = await sails.helpers.organisers.accesspoints.fetch.with({
      accessPoint: req.params.accessPoint,
      user: res.locals.verifiedJWT.sub,
      organiser: req.params.organiser,
    });

    return res.send({
      status: true,
      message: `Returned access point`,
      accessPoint: accessPoint,
    });
  },
};
