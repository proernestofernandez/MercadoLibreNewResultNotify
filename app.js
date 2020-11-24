const psn = require("./models/psn"),
    express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');
    server = require('http').createServer(app),
    port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(methodOverride());

server.listen(port, function() {
    console.log('Escuchando en el puerto: ' + port);
});

var psnsCtrl = require('./controladores/psnsCtrl');

// API routes
var psns = express.Router();

psns.get('/', function(req, res) {
    res.send("Hola WACHING!");
});

psns.get('/psns',function(req, res){
    psnsCtrl.findAllpsns(req,res);
});

psns.post('/psns',function(req, res) {
    psnsCtrl.addpsn(req, res);
});

//
//    psns.route('/psns/:id')
//      .get(psnsCtrl.findById);
////      .put(psnsCtrl.updatepsns)
////      .delete(psnsCtrl.deletepsns);


app.use('/api', psns);
    var mongoDB = 'mongodb://localhost/psn';
//    var mongoDB = 'mongodb://ernesdary:teamos2!@ds041178.mlab.com:41178/ernesdary';

mongoose.connect(mongoDB, function(err, res) {
    if(err) {
        console.log('ERROR: No se pudo conectar con: '+mongoDB +'. ' + err);
    }else {
        console.log('Connectado a la base de datos: '+ mongoDB);
    }
    app.listen(3000, function() {
          console.log("Escuchando en http://localhost:3000");
        });
      });
