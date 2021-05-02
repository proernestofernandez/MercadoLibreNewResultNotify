const express = require('express');
const router = express.Router();
// const { function } = require('joi');

const queries_service = require('../services/query_service');


//Obtener query por id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    queries_service.find_query_by_id(id, function(err, query) {
        if (err) res.send(err)
        res.status(200).send(query);    
    })      
});

// Obtener queries por nickname de creador
router.get('', async (req, res, next) => {
        const creator_nickname = req.query.creator_nickname
        queries_service.find_queries_by_params(creator_nickname, function(err, queries) {
            if (err) res.send(err)
            res.status(200).send(queries);    
        })      
   });

//Crear query
router.post('', async (req, res,next) => {
    const query_param = req.body
    queries_service.add_query(query_param, function(err, saved_query) {
        if (err) res.send(err)
        res.send(saved_query);    
    })        
});

//Execute all query
router.put('', async (req, res,next) => {
    const query_param = req.body
    queries_service.execute_all_queries_from_db(query_param, function(err, saved_query) {
        if (err) res.send(err)
    })        
    res.send("All query executed");
});


module.exports = router;