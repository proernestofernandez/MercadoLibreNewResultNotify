const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage')
});

router.get('/queries', (req, res) => {
    res.render('queries')
});

router.get('/info', (req, res) => {
    res.render('info')
});

module.exports = router;