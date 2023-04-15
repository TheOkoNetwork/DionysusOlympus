/**
 * hermes/tickets/fetch
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.customers.require.with({ req, res });
    const ticket = await sails.helpers.hermes.tickets.fetch.with({
      customer: res.locals.verifiedJWT.sub,
      ticket: req.params.ticket,
    });

    return res.send({
      status: true,
      message: `Returned ticket`,
      ticket: ticket,
    });
  },
};
