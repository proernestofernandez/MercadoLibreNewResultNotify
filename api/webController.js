const express = require('express');
const router = express.Router();
// const { function } = require('joi');
const emailGmail = require('../utils/emailGmail');


//Contactar
router.post('/contacto', async (req, res, next) => {
    const queryParam = req.body
    res.send(emailGmail.sendContactEmail(queryParam));
});

module.exports = router;