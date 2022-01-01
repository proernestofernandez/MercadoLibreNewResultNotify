//import test_user from '../services/user_service';

const express = require('express');
const router = express.Router();
// const { function } = require('joi');
const auditService = require('../services/auditService');


//Obtener los ultimos 20 logs
router.get('/', async (req, res) => {
    const logs = await auditService.findAllLogs()
    if (logs) {
        res.status(200).send(logs);
    } else {
        res.send("No se encontraron logs.")
    }
});

//Obtener log por id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    let log = await auditService.findLogById(id)
    if (log) {
        res.status(200).send(log);
    } else {
        res.send("No se encontró el log.")
    }
});

module.exports = router;