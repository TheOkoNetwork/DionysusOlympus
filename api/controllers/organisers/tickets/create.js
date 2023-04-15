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
    const issuedTicketOrderID =
      await sails.helpers.organisers.tickets.create.with({
        ticketItem: req.body.ticketItem,
        qty: req.body.qty,
        customer: req.body.customer,
        salesChannel: req.body.salesChannel,
        eventInstance: req.body.eventInstance,
        organiser: req.params.organiser,
        user: res.locals.verifiedJWT.sub,
      });

    return res.send({
      status: true,
      message: `Successfully issued ticket`,
      order: issuedTicketOrderID,
    });
  },
};
