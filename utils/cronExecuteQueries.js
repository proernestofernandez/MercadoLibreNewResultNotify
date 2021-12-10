const cron = require('node-cron');
//const queries_service = require('../services/query_service');

cron.schedule('0 0,30 * * * *', function() {
    console.log('Ejecutando todas las consultas cada media hora');
    //queries_service.execute_all_queries_from_db();
  });