/**
 * hermes/tickets/list
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.customers.require.with({ req, res });
    const tickets = await sails.helpers.hermes.tickets.list.with({
      organiser: res.locals.verifiedJWT.organiser,
      customer: res.locals.verifiedJWT.sub,
    });

    return res.send({
      status: true,
      message: `Returned list of: ${tickets.length} tickets`,
      tickets: tickets,
    });
  },
};
