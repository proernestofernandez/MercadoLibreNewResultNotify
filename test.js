var bodyParser = require('body-parser');

var Usuario = require("./models/user");
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
const user_middleware = require('./api/users_controller.js');
//const query_middleware = require('./services/Querys.js');
const port = process.env.PORT || 3000;

express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/user', user_middleware)
    .listen(port, ()=> console.log(`ESCUCHANDO EN EL PUERTO ${port}...`));
    //.use('/query', query_middleware ({ ppe:'Hory' }))
    