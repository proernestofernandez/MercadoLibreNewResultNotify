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

    var result = query_param.path.match(/https:\/\/(.*.com)(.*)/)
    hostname_param = result[1]
    path_param = result[2] + "q=" + query_param.query

    if( typeof query_param.parameters !== 'undefined'){
        query_param.parameters.forEach(function(value,key){
            path_param += "&"+ key + "=" + value
        });
    }

    
    const options = {
      hostname: hostname_param,
      port: 443,
      path: path_param,
      method: 'GET'
    }

  const req2 = https.request(options, res => {
      var body = "";

      res.on("data", (chunk) => {
          body += chunk;
      });

      res.on('end', function(){
          var list = JSON.parse(body);
          list.results.forEach(function(value){
            console.log(value.title);
            /*console.log(value.price);
            console.log(value.currency_id);
            console.log(value.condition);
            console.log(value.permalink);
            console.log(value.address.city_name);*/
            console.log("");

          });
          callback(null,body)
        });
      
        res.on('error', error => {
            console.error(error)
          })
    })
    req2.end()

  
};



exports.execute_all_queries_from_db = async function(query_param, callback) {
    
    const queries_db = await Query.find(function (err, queries) {
        if (err) return console.error(err); 
    })
    queries_db.forEach(function(value){
        this.execute_query(value,callback);
      }.bind(this));
};
