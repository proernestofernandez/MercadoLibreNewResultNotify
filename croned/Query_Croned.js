//var bodyParser = require('body-parser');

//var Usuario = require("./models/Usuario");
var Query = require("../models/Query");
var Peticiones = require("../services/Peticiones");
//var mongoose = require('mongoose');;


//ITERACION CADA 1 HORA
function foo() {


    console.log("CHEQUEANDO CAMBIOS")
    console.log("HAY VEHICULOS NUEVOS")
    console.log("MANDANDO MAILS")
    console.log(".......")
    // find all athletes that play tennis
    var query = Query.find();
    // execute the query at a later time
    query.exec(function (err, querys) {
      if (err) return handleError(err);
        var url = querys[0].path + "q=" + querys[0].query
        Peticiones.execute_query('api.mercadolibre.com','/sites/MLU/search?q=ford%20fiesta&KILOMETERS=[0km-60000km]&VEHICLE_YEAR=2014-2020')
//      console.log(url)
//      console.log(querys)
    })

    setTimeout(foo, 20000);


}

foo()