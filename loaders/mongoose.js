
require('dotenv').config()

var mongoose = require('mongoose');
const user = require("../models/user");
const query = require("../models/query");
const item = require("../models/item");
const vehicle = require("../models/vehicle");
const item_query = require("../models/item_query");


const mongoDB_path = process.env.MONGODB_PATH;
console.log(mongoDB_path)
mongoose.connect(mongoDB_path, function (err, res) {
    if (err) {
        console.log('ERROR: No se pudo conectar con: ' + mongoDB_path + '. ' + err);
    } else {
        console.log('Connectado a la base de datos: ' + mongoDB_path);
    }
});
