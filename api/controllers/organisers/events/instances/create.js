/**
 * organisers/events/instances/create
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
    const eventInstance =
      await sails.helpers.organisers.events.instances.create.with({
        event: req.params.event,
        user: res.locals.verifiedJWT.sub,
        organiser: req.params.organiser,
        startDateTime: req.body.startDateTime,
        gatesOpenDateTime: req.body.gatesOpenDateTime,
        endDateTime: req.body.endDateTime,
        gatesCloseDateTime: req.body.gatesCloseDateTime,
      });

    return res.send({
      status: true,
      message: `Created event instances`,
      eventInstance: eventInstance,
    });
  },
};
