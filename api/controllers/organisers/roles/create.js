/**
 * organisers/accessPoints/create
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });

    await sails.helpers.organisers.roles.create.with({
      email: req.body.email,
      role: req.body.role,
      organiser: req.params.organiser,
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Successfully assigned role: ${req.body.role} to user: ${req.body.email}`,
    });
  },
};
