// require('babel-register');
const express = require('express');
const router = express.Router();

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

// const Component = require('../public/homepage.jsx');

// router.get('/', (req, res) => {
//     var html = ReactDOMServer.renderToString(
//         React.createElement(Component)
//     )
//     res.send(html)
// });

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