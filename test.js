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
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()