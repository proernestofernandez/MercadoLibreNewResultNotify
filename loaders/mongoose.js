

var Usuario = require("../models/user");
var Query = require("../models/query");

var mongoose = require('mongoose');



var mongoDB_path = 'mongodb://localhost/ml_notify';
mongoose.connect(mongoDB_path, function(err, res) {
    if(err) {
        console.log('ERROR: No se pudo conectar con: '+mongoDB_path +'. ' + err);
    }else {
        console.log('Connectado a la base de datos: '+ mongoDB_path);
    }
    });
