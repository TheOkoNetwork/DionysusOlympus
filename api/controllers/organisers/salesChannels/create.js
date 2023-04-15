/**
 * organisers/salesChannels/create
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    const createdSalesChannelSlug =
      await sails.helpers.organisers.saleschannels.create.with({
        organiser: req.params.organiser,
        name: req.body.name,
        type: req.body.type,
        domain: req.body.domain,
        user: res.locals.verifiedJWT.sub,
      });

    return res.send({
      status: true,
      message: `Successfully created sales channel: ${createdSalesChannelSlug}`,
      salesChannelSlug: createdSalesChannelSlug,
    });
  },
};
