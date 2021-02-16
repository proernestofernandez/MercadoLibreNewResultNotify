var bodyParser = require('body-parser');

var Usuario = require("./models/Usuario");
var Query = require("./models/Query");
//var Query_Croned = require("./croned/Query_Croned");
var mongoose = require('mongoose');



var mongoDB_path = 'mongodb://localhost/ml_notify';
mongoose.connect(mongoDB_path, function(err, res) {
    if(err) {
        console.log('ERROR: No se pudo conectar con: '+mongoDB_path +'. ' + err);
    }else {
        console.log('Connectado a la base de datos: '+ mongoDB_path);
    }
    });





//A CONTINUACION SE CARGARAN LOS ENDPOINT
const express = require('express');
const usuario_middleware = require('./services/Usuarios.js');
const query_middleware = require('./services/Querys.js');
const port = process.env.PORT || 3000;

express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/usuario', usuario_middleware ({ pepe:'Hola usuario' }))
    .use('/query', query_middleware ({ ppe:'Hory' }))
    .listen(port, ()=> console.log(`ESCUCHANDO EN EL PUERTO ${port}...`));



const https = require('https')

//function execute_query(hostname, path) {
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
//}
//execute_query("", "")