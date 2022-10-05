// config/log.js
const { Logtail } = require("@logtail/node");
const logtail = new Logtail("duuSfArmtsc96qo1rcsruhBr");


module.exports.log = {
  custom: logtail,
  inspect: false
  // level: 'info'
};
