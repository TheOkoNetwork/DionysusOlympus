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
    const signInData = await sails.helpers.hermes.refresh.with({
      jwt: req.headers.authorization.split(' ')[1],
    });

    return res.send({
      status: true,
      message: 'Refresh complete',
      signInData: signInData
    });
  },
};
