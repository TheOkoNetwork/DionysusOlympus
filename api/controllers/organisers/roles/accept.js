/**
 * organisers/roles/accept
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });

    await sails.helpers.organisers.roles.accept.with({
      organiser: req.params.organiser,
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Successfully accepted roles for organiser: ${req.params.organiser}`,
    });
  },
};
