

var user = require("../models/user");
var query = require("../models/query");
var item = require("../models/item");
var vehicle = require("../models/vehicle");
var item_query = require("../models/item_query");

var mongoose = require('mongoose');



var mongoDB_path = 'mongodb://localhost/ml_notify';
mongoose.connect(mongoDB_path, function(err, res) {
    if(err) {
        console.log('ERROR: No se pudo conectar con: '+mongoDB_path +'. ' + err);
    }else {
        console.log('Connectado a la base de datos: '+ mongoDB_path);
    }
    });
