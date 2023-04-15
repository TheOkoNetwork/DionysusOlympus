/**
 * hermes/tickets/claim
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.customers.require.with({ req, res });
    await sails.helpers.hermes.tickets.claim.with({
      customer: res.locals.verifiedJWT.sub,
      ticket: req.params.ticket,
      ticketHolder: req.body.ticketHolder,
    });

    return res.send({
      status: true,
      message: `Claimed ticket`,
    });
  },
};
