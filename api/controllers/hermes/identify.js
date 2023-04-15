/**
 * hermes/identify
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    const hermesDomain = req.body.domain;
    const salesChannel = await sails.helpers.hermes.identify(hermesDomain);
    if (salesChannel) {
      return res.send({
        status: true,
        salesChannel,
      });
    } else {
      return res.send({
        status: false,
        message: 'Sales channel not found',
      });
    }
  },
};
