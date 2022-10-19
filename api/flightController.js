const express = require('express');
const router = express.Router();
const flight_service = require('../services/flightService');


//Flight query
router.post('/multiCities', async (req, res, next) => {
    const queries_param = req.body
    console.log("CACHENGUE")
    const savedFlights = await flight_service.execute_fligt_query(queries_param);
    if (savedFlights) {
        res.send(savedFlights)
    } else {
        res.send("mal");
    }
});

module.exports = router;