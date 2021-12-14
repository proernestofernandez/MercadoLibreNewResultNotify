const express = require('express');
const { Query } = require('mongoose');
const router = express.Router();
// const { function } = require('joi');
const authService = require('../services/authService');
const queries_service = require('../services/queryService');


//Obtener query por id
router.get('/:id', authService.ensureAuthenticated, async (req, res, next) => {
    const id = req.params.id
    queries_service.find_query_by_id(id, function (err, query) {
        if (err) res.send(err)
        res.status(200).send(query);
    })
});

// Obtener queries por nickname de creador
router.get('', authService.ensureAuthenticated, async (req, res, next) => {
    const creator_nickname = req.query.creator_nickname
    const queries = await queries_service.find_queries_by_params(creator_nickname);
    console.log(queries);
    if (queries) {
        res.status(200).send(queries);
    } else {
        res.status(500).send('mal');
    }
});

//Crear query
router.post('', async (req, res, next) => {
    const query_param = req.body
    const savedQuery = await queries_service.add_query(query_param);
    if (savedQuery) {
        res.send(savedQuery)
    } else {
        res.send("mal");
    }
});

//Execute all query
router.put('', authService.ensureAuthenticated, async (req, res, next) => {
    queries_service.execute_all_queries_from_db()
    res.send("All query executed");
});


module.exports = router;