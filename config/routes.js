/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /organisers': 'organisers/create',
  'GET /organisers': 'organisers/list',
  'GET /organisers/:organiser': 'organisers/fetch',
  'GET /organisers/:organiser/accessPoints': 'organisers/accessPoints/list',
  'POST /organisers/:organiser/accessPoints': 'organisers/accessPoints/create',
  'GET /organisers/:organiser/accessPoints/:accessPoint': 'organisers/accessPoints/fetch',

  'GET /organisers/:organiser/salesChannels': 'organisers/salesChannels/list',
  'POST /organisers/:organiser/salesChannels': 'organisers/salesChannels/create',
  'GET /organisers/:organiser/salesChannels/:salesChannel': 'organisers/salesChannels/fetch',


  'GET /organisers/:organiser/events': 'organisers/events/list',
  'POST /organisers/:organiser/events': 'organisers/events/create',
  'GET /organisers/:organiser/events/:event': 'organisers/events/fetch',


  'GET /organisers/:organiser/roles': 'organisers/roles/list',
  'POST /organisers/:organiser/roles': 'organisers/roles/create',
  'POST /organisers/:organiser/roles/accept': 'organisers/roles/accept',
  'POST /organisers/:organiser/roles/reject': 'organisers/roles/reject',

  'GET /organisers/:organiser/events/:event/instances': 'organisers/events/instances/list',
  'POST /organisers/:organiser/events/:event/instances': 'organisers/events/instances/create',


  'GET /organisers/:organiser/events/:event/ticketItems': 'organisers/events/ticketItems/list',
  'POST /organisers/:organiser/events/:event/ticketItems': 'organisers/events/ticketItems/create',

  'POST /organisers/:organiser/customers': 'organisers/customers/create',
  'GET /organisers/:organiser/customers': 'organisers/customers/list',

  'POST /organisers/:organiser/tickets': 'organisers/tickets/create',

  'POST /csv': 'csv',
  'GET /organisers/:organiser/importedTicketSales': 'organisers/importedTicketSales/list',
  'POST /organisers/:organiser/importedTicketSales': 'organisers/importedTicketSales/process',



  'POST /hermes/identify': 'hermes/identify',
  'POST /hermes/signin/phone/init': 'hermes/signin/phone/init',
  'POST /hermes/signin/phone/complete': 'hermes/signin/phone/complete',
  'GET /hermes/signin/refresh': 'hermes/signin/refresh',
  'GET /hermes/tickets': 'hermes/tickets/list',
  'GET /hermes/tickets/:ticket': 'hermes/tickets/fetch',
  'POST /hermes/tickets/:ticket/transfer': 'hermes/tickets/transfer',
  'POST /hermes/tickets/:ticket/claim': 'hermes/tickets/claim',
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
