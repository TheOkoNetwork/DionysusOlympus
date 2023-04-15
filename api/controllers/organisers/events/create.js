/**
 * organisers/events/create
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    const createdEventSlug = await sails.helpers.organisers.events.create.with({
      name: req.body.name,
      timezone: req.body.timezone,
      organiser: req.params.organiser,
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Successfully created event: ${createdEventSlug}`,
      eventSlug: createdEventSlug,
    });
  },
};
