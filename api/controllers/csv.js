/**
 * csv
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async function () {
    const { req, res } = this;
    const csvLines = req.body;
    for (const csvLine of csvLines) {
      const {
        externalOrderID,
        purchaserFirstName,
        purchaserLastName,
        purchaserEmail,
        purchaserPhoneNumber,
        saleProduct,
        saleQTY
      } = csvLine.row_data;
      const {
        externalOrderSource,
        organiser
      } = csvLine.custom_fields;

      const existingImportingOrder = await ImportedTicketSales.findOne({
        externalOrderID,
        externalOrderSource,
        organiser,
      });
      if (existingImportingOrder) {
        continue;
      }
      const existingOrder = await Orders.findOne({
        externalOrderID,
        externalOrderSource,
        organiser,
      });
      if (existingOrder) {
        continue;
      }
      await ImportedTicketSales.create({
        externalOrderID,
        purchaserFirstName,
        purchaserLastName,
        purchaserEmail,
        purchaserPhoneNumber,
        saleProduct,
        saleQTY,
        user: csvLine.custom_fields.user_id,
        externalOrderSource,
        organiser,
        status: 'PENDING',
      });
    }

    sails.log(csvLines);
    return res.send({
      status: true,
    });
  },
};
