/**
 * hermes/tickets/digitalWallet
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.customers.require.with({ req, res });
    const ticket = await Tickets.findOne({
      customer: res.locals.verifiedJWT.sub,
      id: req.params.ticket,
    });
    if (!ticket) {
      return res.send({
        status: false,
        message: `Ticket not found`,
      });
    }
    if (ticket.status !== 'CLAIMED') {
      return res.send({
        status: false,
        message: `Ticket not claimed`,
      });
    }
    if (!ticket.flags['DIGITAL_WALLET_ALLOW']) {
      return res.send({
        status: false,
        message: `Ticket does not allow digital wallet`,
      });
    }
    const passkitComID = await sails.helpers.digitalWallet.passkitCom.issue.with({ticket: ticket.id});
    const digitalWallet = {
      google: `https://pub1.pskt.io/${passkitComID}.gpay`,
      apple: `https://pub1.pskt.io/${passkitComID}.pkpass`,
    };
    return res.send({
      status: true,
      message: `Generated digital wallet pass`,
      digitalWallet: digitalWallet,
    });
  },
};
