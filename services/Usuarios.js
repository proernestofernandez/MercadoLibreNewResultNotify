const mongoose = require('mongoose'),
express = require('express');
var Usuario  = mongoose.model('Usuario');
var Usuarios_Ctrl = require('../controladores/Usuarios_Ctrl');


module.exports = function(options = {}) { // Router factory
    const router = express.Router();

    //GET Usuario
    router.get('/nickname', (req, res, next) => {
        Usuarios_Ctrl.findByNick(req.nickname,res)
    });

    //ADD Usuario
    router.post('', (req, res,next) => {
        var usuario = Object.assign(new Usuario, req.body)
        Usuarios_Ctrl.add_usuario(usuario)
        res.send('POST' );
    });


    return router;
};