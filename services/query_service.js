var mongoose = require('mongoose');
var Query  = mongoose.model('query');


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


//POST - Crea un usuario en la BD
exports.add_query = function(query_param, callback) {

    const new_query = Object.assign(new Query, query_param)
    
    new_query.save( function(err, saved_query) {
        if(err) callback(new Error("No se pudo crear el query"));
        callback(null,saved_query)
    });
};

