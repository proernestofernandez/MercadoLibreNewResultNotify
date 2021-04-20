var mongoose = require('mongoose');
var Query  = mongoose.model('query');

const https = require('https');


//GET - Retorna un query con el id proporcionado
exports.find_query_by_id = function(id, callback) {
    Query.findById(id, function (err, query) {
        if(err) callback(err);
        callback(null,query);
    })
};


//GET - Retorna todas las queries con el nickname del creador proporcionado
exports.find_queries_by_params = function(creator_nickname, callback) {

    if (!creator_nickname) {
        Query.find(function (err, queries) {
            if(err) callback(err);
            callback(null,queries);
        })
    }else {
        Query.find({ 'usuario_creacion': creator_nickname }, function (err, queries) {
            if(err) callback(err);
            callback(null,queries);
        })
    }
};


//POST - Create query in DB
exports.add_query = function(query_param, callback) {

    const new_query = Object.assign(new Query, query_param)
    
    new_query.save( function(err, saved_query) {
        if(err) callback(new Error("No se pudo crear el query"));
        callback(null,saved_query)
    });
};

//PUT - Excecute specific query BD
exports.execute_query = function(query_param, callback) {

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
          //process.stdout.write(body)
      });
    })

    req2.on('error', error => {
        console.error(error)
      })
      
      req2.end()


      res2.on('end', function(){
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
          callback(null,saved_query)
        });
      console.log("Terminoooo")


    //const new_query = Object.assign(new Query, query_param)
    
    /*new_query.save( function(err, saved_query) {
        if(err) callback(new Error("No se pudo crear el query"));
        callback(null,saved_query)
    });*/
    
    
  
};
