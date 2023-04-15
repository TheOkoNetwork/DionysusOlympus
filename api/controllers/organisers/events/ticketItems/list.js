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
    const ticketItems = await sails.helpers.organisers.events.ticketitems.list.with({
      organiser: req.params.organiser,
      event: req.params.event,
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Returned list of: ${ticketItems.length} events`,
      ticketItems: ticketItems,
    });
  },
};
