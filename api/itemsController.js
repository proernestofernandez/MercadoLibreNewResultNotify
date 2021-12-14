const express = require('express');
const router = express.Router();
// const { function } = require('joi');
const authService = require('../services/authService');
const items_service = require('../services/itemService');


//Obtener item por id
router.get('/:id', authService.ensureAuthenticated, async (req, res, next) => {
    const id = req.params.id
    items_service.find_item_by_id(id, function (err, user) {
        if (err) res.send(err)
        res.status(200).send(user);
    })
});

// Obtener items por parametros
router.get('', authService.ensureAuthenticated, async (req, res, next) => {
    const query_id = req.query.query_id
    //Unicamente por nickname_query_creator
    items_service.find_items_by_params(query_id, function (err, user) {
        if (err) res.send(err)
        res.status(200).send(user);
    })
});

//Crear item
router.post('', authService.ensureAuthenticated, async (req, res, next) => {
    const item_param = req.body
    items_service.add_item(item_param, function (err, saved_item) {
        if (err) res.send(err)
        res.send(saved_item);
    })
});

module.exports = router;