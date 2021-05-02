var bodyParser = require('body-parser');

const https = require('https');






console.log("ENTROOO")
const options = {
  hostname: 'api.mercadolibre.com',
  port: 443,
  path: '/sites/MLU/search?q=ford%20fiesta&KILOMETERS=[0km-60000km]&VEHICLE_YEAR=2014-2020',
  method: 'GET'
}


const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    body = '';
    res.on('data', d => {
      body += chunk;
      //process.stdout.write(d)
    })

    res.on('end', function(){
      console.log("ESTOY ACACACACACACCA: ");
      console.log(req.data);
      console.log(body);
  
  /*
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
  
        });*/
        //callback(null,body)
      });

      res.on('error', error => {
        console.error(error)
      })

      req.end()
  })
  
  
  
  

  
    