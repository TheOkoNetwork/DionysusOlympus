/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  'organisers/create': true,
  'organisers/list': true,
  'organisers/fetch': true,

  'organisers/accessPoints/create': true,
  'organisers/accessPoints/list': true,
  'organisers/accessPoints/fetch': true,

  'organisers/salesChannels/create': true,
  'organisers/salesChannels/list': true,
  'organisers/salesChannels/fetch': true,


  'organisers/events/create': true,
  'organisers/events/list': true,
  'organisers/events/fetch': true,

  'organisers/roles/create': true,
  'organisers/roles/list': true,
  'organisers/roles/accept': true,
  'organisers/roles/reject': true,

  'organisers/events/instances/list': true,
  'organisers/events/instances/create': true,

  'organisers/customers/list': true,
  
  'organisers/events/ticketItems/create': true,


  'organisers/tickets/create': true,

  'csv': true,
  'organisers/importedTicketSales/list': true,
  'organisers/importedTicketSales/process': true,

  'hermes/identify': true,
  'hermes/signin/phone/init': true,
  'hermes/signin/phone/complete': true,
  'hermes/signin/refresh': true,
  'hermes/tickets/list': true,
  'hermes/tickets/fetch': true,
  'hermes/tickets/transfer': true,
  'hermes/tickets/claim': true,
  'hermes/tickets/digital-wallet': true,
};
