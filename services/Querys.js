const mongoose = require('mongoose'),
    express = require('express');
//    require("./models/psn")
var Query  = mongoose.model('Query');
var Querys_Ctrl = require('../controladores/Querys_Ctrl');

module.exports = function(options = {}) { // Router factory
    const router = express.Router();

    //GET Query
    router.get('/id', (req, res, next) => {
        Querys_Ctrl.findById(req.id,res)
    });

    //GET Todas las Query
    router.get('/', (req, res, next) => {
        Querys_Ctrl.findAll(res)
    });

    //ADD Query
    router.post('', (req, res,next) => {
        var query = Object.assign(new Query, req.body)
        Querys_Ctrl.add_query(query)
        res.send('POST' );
    });


    return router;
};