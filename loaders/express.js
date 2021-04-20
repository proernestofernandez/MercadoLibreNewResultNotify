
//A CONTINUACION SE CARGARAN LOS ENDPOINT
const express = require('express');
var bodyParser = require('body-parser');

const user_middleware = require('../api/users_controller.js');
const query_middleware = require('../api/queries_controller.js');
const item_middleware = require('../api/items_controller.js');
const port = process.env.PORT || 3000;

express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/users', user_middleware)
    .use('/queries', query_middleware)
    .use('/items', item_middleware)
    .listen(port, ()=> console.log(`ESCUCHANDO EN EL PUERTO ${port}...`));
    //.use('/query', query_middleware ({ ppe:'Hory' }))