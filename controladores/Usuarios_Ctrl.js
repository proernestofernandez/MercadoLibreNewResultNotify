var mongoose = require('mongoose');
var Usuario  = mongoose.model('Usuario');


////GET - Return all psns in the DB
//exports.findAllpsns = function(req, res) {
//console.log('GET');
//	psn.find(function(err, psn_instances) {
//        if(err) res.send(500, err.message);
//        res.status(200).jsonp(psn_instances);
//        });
//};

//GET - Return a Usuario with specified Nickname
exports.findByNick = function(nickname, res) {
    Usuario.findOne({ 'nickname.value': nickname }, function (err, usuario) {
        if(err) return res.send(err);
        res.send(usuario);
//        return usuario;
    })
    return 'POPOPO'
};


//POST - Insert a new psn in the DB
exports.add_usuario = function(usuario) {
	console.log('POST dentro');

	usuario.save(function(err, usuario) {
    		if(err) console.log(err);
            console.log(usuario);
     });
};

/*//PUT - Update a register already exists
exports.updatepsn = function(req, res) {
	psn.findById(req.params.id, function(err, psn) {
		        psn.nombre:   req.body.nombre,
                psn.usd_valor:     req.body.usd_valor,
                psn.fecha_comprado:  req.body.fecha_comprado,
                psn.fecha_vendido:  req.body.fecha_vendido,
                psn.usd_comprado:   req.body.usd_comprado,
                psn.usd_vendido:  req.body.usd_vendido,
                psn.lugar_comprado:  req.body.lugar_comprado,
                psn.lugar_vendido:  req.body.lugar_vendido,
                psn.ganancia: req.body.ganancia,
                psn.valido:   req.body.valido,
                psn.comprador:    req.body.comprador

		psn.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(psn);
		});
	});
};*/

////DELETE - Delete a psn with specified ID
//exports.deletepsn = function(req, res) {
//	psn.findById(req.params.id, function(err, psn) {
//		psn.remove(function(err) {
//			if(err) return res.status(500).send(err.message);
//      res.status(200).send();
//		})
//	});
//};