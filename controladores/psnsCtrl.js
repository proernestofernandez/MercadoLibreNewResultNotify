var mongoose = require('mongoose');
var psn  = mongoose.model('psn');


//GET - Return all psns in the DB
exports.findAllpsns = function(req, res) {
console.log('GET');
	psn.find(function(err, psn_instances) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(psn_instances);
        });
};

//GET - Return a psn with specified ID
exports.findById = function(req, res) {
	psn.findById(req.params.id, function(err, psn) {
    if(err) return res.send(500, err.message);

    console.log('GET /psn/' + req.params.id);
		res.status(200).jsonp(psn);
	});
};


//POST - Insert a new psn in the DB
exports.addpsn = function(req, res) {
	console.log('POST');
	var psn_instance = new psn(
	{
	    nombre:   req.body.nombre,
        usd_valor:     req.body.usd_valor,
        fecha_comprado:  req.body.fecha_comprado,
        fecha_vendido:  req.body.fecha_vendido,
        usd_comprado:   req.body.usd_comprado,
        usd_vendido:  req.body.usd_vendido,
        lugar_comprado:  req.body.lugar_comprado,
        lugar_vendido:  req.body.lugar_vendido,
        codigo:  req.body.codigo,
        ganancia: req.body.ganancia,
        valido:   req.body.valido,
        comprador:    req.body.comprador
	});
console.log(psn_instance);
	psn_instance.save(function(err, psn) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(psn_instance);
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

//DELETE - Delete a psn with specified ID
exports.deletepsn = function(req, res) {
	psn.findById(req.params.id, function(err, psn) {
		psn.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};