const mongoose = require('mongoose'),
    express = require('express');
//    require("./models/psn")
var Query  = mongoose.model('Query');
var Querys_Ctrl = require('../controladores/Querys_Ctrl');

const https = require('https')


function execute_query(hostname, path) {
    console.log("ENTROOO")
    const options = {
      hostname: 'api.mercadolibre.com',
      port: 443,
      path: '/sites/MLU/search?q=ford%20fiesta&KILOMETERS=[0km-60000km]&VEHICLE_YEAR=2014-2020',
      method: 'GET'
    }

  const req2 = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

      var body = "";

      res.on("data", (chunk) => {
          body += chunk;
      });

      console.log(body)

      res.on('end', function(){
          var list = JSON.parse(body);
          console.log("Got a response: ", list.site_id);
          console.log("Got a response: ", list.paging.total);

          list.results.forEach(function(value){
            console.log(value.title);
            console.log(value.price);
            console.log(value.currency_id);
            console.log(value.condition);
            console.log(value.permalink);
            console.log(value.address.city_name);
            console.log("");

          });
  //        console.log("Got a response: ", list.results[0]);
      });
      console.log("Terminoooo")

  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
}




// add the code below
module.exports = { execute_query }