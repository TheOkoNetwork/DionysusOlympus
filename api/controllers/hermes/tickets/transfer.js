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
    try {
      await sails.helpers.hermes.tickets.transfer.with({
        customer: res.locals.verifiedJWT.sub,
        ticket: req.params.ticket,
        phone: req.body.phone,
      });
      return res.send({
        status: true,
        message: `transfered ticket`,
      });

    } catch(err) {
      console.log(err);
      return res.send({
        status: false,
        message: `Please ask the person receiving the ticket to register first, they can do this by signing in with the phone number`,
      });
    }
  },
};
