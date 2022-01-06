const cron = require('node-cron');
const mongoose = require('mongoose');

const Audit = mongoose.model('audit');
const queries_service = require('../services/queryService');
const converters = require('../utils/converters');

cron.schedule('0 0,47 * * * *', async function () {
  console.log('Ejecutando todas las consultas cada media hora');

  queries_service.execute_all_queries_from_db();
  var audit = Object.assign(new Audit);
  audit.type = "Cron";
  audit.dateTime = converters.newFormattedDate();
  audit.info = "Running CronJob";
  await audit.save();

});