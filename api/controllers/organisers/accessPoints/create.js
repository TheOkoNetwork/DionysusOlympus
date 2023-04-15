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
    const createdAccessPointSlug =
      await sails.helpers.organisers.accesspoints.create.with({
        name: req.body.name,
        organiser: req.params.organiser,
        user: res.locals.verifiedJWT.sub,
      });

    return res.send({
      status: true,
      message: `Successfully created access point: ${createdAccessPointSlug}`,
      accessPointSlug: createdAccessPointSlug,
    });
  },
};
