module.exports = {


  friendlyName: 'Dequeue emails for customers with claimed tickets',


  description: '',


  fn: async function () {

    sails.log('Fetching customer IDs with claimed tickets');
    const db = Tickets.getDatastore().manager;
    const agg = [
      {
        '$match': {
          'status': 'CLAIMED'
        }
      }, {
        '$group': {
          '_id': '$customer'
        }
      }, {
        '$project': {
          'customer': '$_id',
          '_id': 0
        }
      }
    ];
    const coll = db.collection('tickets');
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    console.log(result);
    const customerIds = result.map(r => r.customer);
    sails.log(`Found ${customerIds.length} customers with claimed tickets`);
    for (const customerId of customerIds) {
      sails.log(`Dequeueing emails for customer ${customerId}`);
      await db.collection('emailqueue').update({'data.customer.id': customerId}, {$set: {status: 'DEQUEUED'}});
    }
    return result;
  }


};

