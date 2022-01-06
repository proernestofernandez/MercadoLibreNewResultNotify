
//A CONTINUACION SE CARGARAN LOS ENDPOINT
const express = require('express');
var bodyParser = require('body-parser');

const userMiddleware = require('../api/usersController.js');
const queryMiddleware = require('../api/queriesController.js');
const itemMiddleware = require('../api/itemsController.js');
const auditMiddleware = require('../api/auditsController.js');
const authMiddleware = require('../api/authController.js');
const port = process.env.PORT || 3000;



express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/users', userMiddleware)
    .use('/queries', queryMiddleware)
    .use('/audit', auditMiddleware)
    .use('/auth', authMiddleware)
    /* serve your front (stored in the public folder) */
    .use("/", express.static("public", {
        extensions: ['html', 'htm']
    }))
    .listen(port, () => console.log(`ESCUCHANDO EN EL PUERTO ${port}...`));

