var mongoose = require('mongoose');
var Query  = mongoose.model('query');
var ItemQuery  = mongoose.model('item_query');
var User  = mongoose.model('user');
var Item  = mongoose.model('item');

const https = require('https');
const users_service = require('../services/user_service');
const converters = require('../utils/converters');


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

//Create item_query in DB
exports.add_item_query = async function(item, query_param, callback) {

    var new_item_query = await Object.assign(new ItemQuery)
    
    const user = await users_service.find_user_by_params("Ernes19",callback);
    new_item_query.user = user;

    new_item_query.query = query_param;

    new_item_query.item = await converters.ml_item_to_item(item);
    
    console.log("fds");
    let ola = await is_item_unchanged(new_item_query.query._id, new_item_query.item, user._id);

        console.log("fds2222");
        console.log(ola);
    
    /*new_item_query.item.save( function(err, saved_query) {
        if(err) callback(new Error("No se pudo crear el item query"),null);
        callback(null,saved_query)
    }); 

    new_item_query.save( function(err, saved_query) {
        if(err) callback(new Error("No se pudo crear el item query"),null);
        callback(null,saved_query)
    }); */
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
            this.add_item_query(value, query_param, callback);
          }.bind(this));
          callback(null,body)
        }.bind(this));
      
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

exports.find_query_by_params = function(nickname, callback) {

    if (!nickname) {
        return Query.find(function (err, user) {
            if(err) callback(err);
            callback(null,user);
        })
    }else {
        return Query.find({'usuario_creacion': nickname }, function (err, user) {
            if(err) callback(err);
            callback(null,user);
        })
    }
};




async function is_item_unchanged(query_id, item, user_id) {
    console.log(item.id_item_ml);    
    /*console.log("***********************");
        console.log(query_id);
        console.log("--------");
        console.log(item);
        
        console.log("--------");
        console.log(user_id);
        console.log("   ");
        console.log("   ");
        console.log("   ");*/
        result = null;
    if (item !== null){
        let pep = await ItemQuery.findByItem(mongoose.Types.ObjectId(query_id),item.id_item_ml, mongoose.Types.ObjectId(user_id), function (err, couple, result) {
            if(err) console.log(err);
            
            //console.log("//////////");
            //console.log(couple);
            if (couple !== null)
                console.log(couple.item.id_item_ml);
            if (couple !== null)   { 
                if (item.id_item_ml === couple.item.id_item_ml){
                    console.log("true 1");
                    result=true;
                    return true
                }
                else{
                    console.log("false 1");
                    return false
                }
            }
            else{
                console.log("false 2");
                return false
            }
        }).populate("item");
        console.log("result");
        console.log(pep);
        console.log("false 3");
        return false;
    }
    else {
        console.log("false 4");
        return false;
    }
     
};

