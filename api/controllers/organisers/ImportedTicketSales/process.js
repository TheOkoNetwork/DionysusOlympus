/**
 * organisers/importedTicketSales/list
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    sails.log(req.headers.authorization);
    await sails.helpers.authentication.organisers.require.with({ req, res });
    await sails.helpers.organisers.importedticketsales.process.with({
      organiser: req.params.organiser,
      user: res.locals.verifiedJWT.sub,
      saleProduct: req.body.saleProduct,
      ticketItem: req.body.ticketItem,
      salesChannel: req.body.salesChannel,
    });

    return res.send({
      status: true,
      message: `Processed imported ticket sales`,
    });
  },
};
