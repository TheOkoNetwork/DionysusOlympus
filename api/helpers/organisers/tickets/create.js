module.exports = {
  friendlyName: 'organisers/ticket/create',

  description: 'Issues a single ticket type for a single event',
  inputs: {
    externalOrderID: {
      type: 'string',
      required: false,
      description: 'The external order ID',
    },
    externalOrderSource: {
      type: 'string',
      required: false,
      description: 'The external order source',
    },
    user: {
      type: 'string',
      required: true,
      description: 'The UID of the user issuing this ticket',
    },
    organiser: {
      type: 'string',
      required: true,
      description: 'The organiser to issue this this for',
    },
    ticketItem: {
      type: 'string',
      required: true,
      description: 'The ticket item to issue',
    },
    eventInstance: {
      type: 'string',
      required: true,
      description: 'The event instance to issue this ticket for',
    },
    qty: {
      type: 'number',
      required: true,
      description: 'The QTY of tickets to issue',
    },
    customer: {
      type: 'string',
      required: true,
      description: 'The customer to issue this ticket to',
    },
    salesChannel: {
      type: 'string',
      required: true,
      description: 'The sales channel to issue this ticket through',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    if (inputs.user !==0 && inputs.user !== '0') {
      await sails.helpers.organisers.hasAnyRole.with({user:inputs.user,organiser: inputs.organiser});
    }
    const organiser = await Organisers.findOne({slug: inputs.organiser});
    if (!organiser) {
      throw 'organiserNotFound';
    }

    const ticketItem = await TicketItems.findOne({slug: inputs.ticketItem, organiser: inputs.organiser});
    if (!ticketItem) {
      throw 'ticketItemNotFound';
    }
    const customer = await Customers.findOne({id: inputs.customer, organiser: inputs.organiser});
    if (!customer) {
      throw 'customerNotFound';
    }
    const salesChannel = await SalesChannels.findOne({slug: inputs.salesChannel, organiser: inputs.organiser});
    if (!salesChannel) {
      throw 'salesChannelNotFound';
    }
    let salesChannelDomain = salesChannel.domain.find((d) => {
      return d.verified === true;
    }).domain;

    const event = await Events.findOne({slug: ticketItem.event, organiser: inputs.organiser});
    if (!event) {
      throw 'eventNotFound';
    }
    const eventInstance = event.instances.find((i) => i.id === inputs.eventInstance);
    if (!eventInstance) {
      throw 'eventInstanceNotFound';
    }
    sails.log('Got all data required to issue');

    const db = Organisers.getDatastore().manager;
    const dbClient = db.client;
    const session = dbClient.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };
    let orderId;
    let orderCreated;
    await session.withTransaction(async () => {
      const colOrders = db.collection('orders');
      const colTickets = db.collection('tickets');

      if (inputs.extenralOrderID && inputs.externalOrderSource) {
        const existingOrder = await colOrders.findOne({
          externalOrderID: inputs.externalOrderID,
          externalOrderSource: inputs.externalOrderSource,
          organiser: inputs.organiser,
        });
        if (existingOrder) {
          orderId = existingOrder._id;
          sails.log('Found existing order', existingOrder);
          return orderId;
        }
      }
      const generatedOrder = await colOrders.insertOne({
        createdAt: new Date(),
        updatedAt: new Date(),
        organiser: inputs.organiser,
        customer: inputs.customer,
        salesChannel: inputs.salesChannel,
        status: 'ORDER_CREATED_PENDING_TICKET_ISSUE',
        flags: {},
        externalOrderID: inputs.externalOrderID,
        externalOrderSource: inputs.externalOrderSource,
      }, {session});
      const order = generatedOrder.ops[0];
      orderId = order._id;
      orderCreated = true;
      sails.log('Created order', order);

      //repeat inputs.qty times to create ticket
      for (let i = 0; i < inputs.qty; i++) {
        await colTickets.insertOne({
          createdAt: new Date(),
          updatedAt: new Date(),
          barcode: await sails.helpers.generateBarcode(),
          organiser: inputs.organiser,
          event: ticketItem.event,
          eventInstance: inputs.eventInstance,
          ticketItem: ticketItem.slug,
          customer: inputs.customer,
          salesChannel: inputs.salesChannel,
          order: orderId.toString(),
          status: 'TICKET_ISSUED',
          flags: {}
        }, {session});
      }

      await colOrders.updateOne({
        _id: orderId,
      }, {
        $set: {
          updatedAt: new Date(),
          status: 'ORDER_CREATED_TICKETS_ISSUED',
        },
      }, {session});

    }, transactionOptions);

    if (orderCreated) {
      const eventCommunicationData = {customer: customer, qty: inputs.qty, organiser:{name:organiser.name},event:{name:event.name},salesChannel:{domain:salesChannelDomain}};
      await sails.helpers.communications.sms.dispatch.with({to:customer.phone,template:'6435b57a7a3fb5266ae55c9c',data:eventCommunicationData});
      if (customer.email) {
        await sails.helpers.communications.email.dispatch.with({
          to: customer.email,
          template: '6435b69d5fb9b53e21298474',
          data: eventCommunicationData,
        });
      }
    }
    return orderId;
  },
};
