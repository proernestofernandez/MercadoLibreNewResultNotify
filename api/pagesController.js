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

router.get('/notificationApp', (req, res) => {
    res.render('notificationApp')
});

router.get('/earlyBookingApp', (req, res) => {
    res.render('earlyBookingApp')
});

router.get('/info', (req, res) => {
    res.render('info')
});

module.exports = router;