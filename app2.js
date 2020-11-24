// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);




const https = require('https')
const options = {
  hostname: 'api.mercadolibre.com',
  port: 443,
  path: '/sites/MLU/search?q=ford%20fiesta&KILOMETERS=[0km-60000km]&VEHICLE_YEAR=2014-2020',
  method: 'GET'
}



// routes will go here
app.get('/ml_manual_query/vehiculo', function(req, res) {
  var path = req.params[0];
  var token = req.params.token;
  var geo = req.param.geo;


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

}).on('error', function(e){
      console.log("Got an error: ", e);
});

req2.end()

  res.send(' ' + token + ' ' + geo + ' ' + 'DARYAN\n'

  +' https://api.mercadolibre.com/sites/MLU/search?q=ford%20fiesta&KILOMETERS=[0km-60000km]&VEHICLE_YEAR=2014-2020');



});







// http://localhost:8080/api/1
  app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });



  // parameter middleware that will run before the next routes
  app.param('nombre', function(req, res, next, name) {

      // check if the user with that name exists
      // do some validations
      // add -dude to the name
      var modified = name + '-DE LA PSN';

      // save name to the request
      req.name = modified;

      next();
  });

  // http://localhost:8080/api/users/chris
  app.get('/api/psns/:nombre', function(req, res) {
      // the user was found and is available in req.user
      res.send('What is up ' + req.name + '!');
  });



  // POST http://localhost:8080/api/users
  // parameters sent with
  app.post('/api/psns', function(req, res) {
      var user_id = req.body.id;
      var token = req.body.token;
      var geo = req.body.geo;

      res.send(user_id + ' ' + token + ' ' + geo);
  });