
require('dotenv').config()

var mongoose = require('mongoose');
const mongoDB_path = process.env.MONGODB_PATH;

mongoose.connect(mongoDB_path, function (err, res) {
    if (err) {
        console.log('ERROR: No se pudo conectar con: ' + mongoDB_path + '. ' + err);
    } else {
        console.log('Connectado a la base de datos: ' + mongoDB_path);
    }
});





