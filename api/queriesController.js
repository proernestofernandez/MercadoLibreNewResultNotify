const express = require('express');
const { Query } = require('mongoose');
const router = express.Router();
// const { function } = require('joi');
const authService = require('../services/authService');
const queries_service = require('../services/queryService');


//Obtener query por id
router.get('/:id', authService.ensureAuthenticated, async (req, res, next) => {
    const id = req.params.id
    const query = queries_service.find_query_by_id(id);
    if (query) {
        res.status(200).send(query);
    } else {
        res.send("No se pudo obtener la consulta")
    }
});

// Obtener queries por nickname de creador
router.get('', authService.ensureAuthenticated, async (req, res, next) => {
    const creator_nickname = req.query.creator_nickname
    console.log(creator_nickname)
    const queries = await queries_service.findQueriesByParams(creator_nickname);
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
router.put('', async (req, res, next) => {
    queries_service.execute_all_queries_from_db()
    res.send("All query executed");
});


module.exports = router;