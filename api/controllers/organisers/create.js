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

    const createdOrganisationSlug = await sails.helpers.organisers.create.with({
      creator: res.locals.verifiedJWT.sub,
      name: req.body.name,
    });

    return res.send({
      status: true,
      message: `Successfully created organiser: ${createdOrganisationSlug}`,
      organiserSlug: createdOrganisationSlug,
    });
  },
};
