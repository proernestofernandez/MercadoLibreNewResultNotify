
//A CONTINUACION SE CARGARAN LOS ENDPOINT
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');


const userMiddleware = require('../api/usersController.js');
const queryMiddleware = require('../api/queriesController.js');
const itemMiddleware = require('../api/itemsController.js');
const auditMiddleware = require('../api/auditsController.js');
const authMiddleware = require('../api/authController.js');
const pagesMiddleware = require('../api/pagesController.js');
const port = process.env.PORT || 3000;



express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/api/users', userMiddleware)
    .use('/api/queries', queryMiddleware)
    .use('/api/items', itemMiddleware)
    .use('/api/audit', auditMiddleware)
    .use('/api/auth', authMiddleware)
    .use('/api/auth', authMiddleware)
    .use('/', pagesMiddleware)
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, '../public/pages'))
    .use('/css', express.static("public/css"))
    .use('/js', express.static("public/js"))
    .use('/font', express.static("public/font"))
    .use('/images', express.static("public/images"))


    .listen(port, () => console.log(`ESCUCHANDO EN EL PUERTO ${port}...`));

