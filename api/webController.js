const express = require('express');
const router = express.Router();
// const { function } = require('joi');
const queries_service = require('../services/queryService');


//Contactar
router.post('/contacto', async (req, res, next) => {
    const query_param = req.body
    console.log("🚀 ~ file: webController.js ~ line 10 ~ router.post ~ query_param", query_param)

    if (query_param) {
        res.send(query_param)
    } else {
        res.send("mal");
    }
});

module.exports = router;