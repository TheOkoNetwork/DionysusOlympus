/**
 * validate/tickets
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  fn: async function () {
    const { req, res } = this;
    const decodedJWT = await sails.helpers.aadB2C.with({ jwt: req.headers.authorization.split('Bearer ')[1] });
    console.log({ user: decodedJWT.sub,event: req.params.event ,role:'SCAN_AGENT' });
    const agentEventAuthorised = await Agent.findOne({ user: decodedJWT.sub,event: req.params.eventId,role:'SCAN_AGENT' });
    console.log(agentEventAuthorised);
    if (!agentEventAuthorised) {
      return res.status(401).send('You are not authorised to scan this event');
    }

    const event = await Event.findOne({ id: req.params.eventId });
    if (!event) {
      return res.status(404).send('Event not found');
    }

    const tickets = await Ticket.find({ event: req.params.eventId });
    return {
      status: true,
      tickets: tickets
    };
  }
};
