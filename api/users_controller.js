const express = require('express');
const router = express.Router();
// const { function } = require('joi');

const users_service = require('../services/user_service');

////Obtener todos los usuarios
//router.get('/', (req, res, next) => {
//    users_service.find_all_users(function(err, users) {
//        if (err) res.send(err)
//        res.status(200).send(users);    
//    })      
//});

//Obtener usuario por id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    users_service.find_user_by_id(id, function(err, user) {
        if (err) res.send(err)
        res.status(200).send(user);    
    })      
});

// Obtener usuarios por parametros
router.get('', async (req, res, next) => {
        const nickname = req.query.nickname
        //Unicamente por nickname
        users_service.find_user_by_params(nickname, function(err, user) {
            if (err) res.send(err)
            res.status(200).send(user);    
        })      
   });

//Crear usuario
router.post('', async (req, res,next) => {
    const user_param = req.body
    users_service.add_user(user_param, function(err, saved_user) {
        if (err) res.send(err)
        res.send(saved_user);    
    })        
});

module.exports = router;