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
    const createdTicketItemSlug = await sails.helpers.organisers.events.ticketitems.create.with({
      name: req.body.name,
      description: req.body.description,
      eventInstances: req.body.eventInstances,
      accessPoints: req.body.accessPoints,
      itemType: req.body.itemType,
      event: req.params.event,      
      organiser: req.params.organiser,
      user: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Successfully created ticket item: ${createdTicketItemSlug}`,
      ticketItem: createdTicketItemSlug,
    });
  },
};
