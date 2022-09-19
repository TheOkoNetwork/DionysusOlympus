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
  '*': false,
  'event/find': true,
  'event/findOne': true,

  'cart/new': true,
  'cart/cart': true,
  'cart/pay': true,
  'cart/order': true,
  'stripe/webhook': true,
  'order/order': true,
  'order/tickets': true,
  'tickets/claim': true,
  'tickets/transfer': true,
  'tickets/tickets': true,
  'tickets/mobile-wallet': true,
  'validate/events': true,
  'validate/device-registration': true,
  'validate/validate': true,
  'validate/tickets': true,
  'validate/scans': true,
  'version': true,
  'pubsub/token': true,


  'admin/tickets/transfer': 'isValidAppsmithKey',
  'admin/tickets/tickets': 'isValidAppsmithKey',
  'admin/tickets/ticket': 'isValidAppsmithKey',
  'admin/uid-to-email': 'isValidAppsmithKey',
  'admin/events/set-total-qty': 'isValidAppsmithKey',
  'admin/tickets/bulk-issue': 'isValidAppsmithKey',
  'admin/roles/set': 'isValidAppsmithKey',

  'global/roles/assigned': true,
};
