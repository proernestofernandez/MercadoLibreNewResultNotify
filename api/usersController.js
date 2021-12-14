//import test_user from '../services/user_service';

const express = require('express');
const router = express.Router();
// const { function } = require('joi');
const authService = require('../services/authService');
const users_service = require('../services/userService');


//Obtener todos los usuarios
router.get('/', authService.ensureAuthenticated, async (req, res) => {
    const nickname = req.query.nickname;
    let users;
    if (nickname) {
        users = await users_service.find_user_by_nickname(nickname)
    } else {
        users = await users_service.find_all_users()
    }
    if (users) {
        res.status(200).send(users);
    } else {
        res.send("No se encontraron usuarios.")
    }
});

//Obtener usuario por id
router.get('/:id', authService.ensureAuthenticated, async (req, res) => {
    console.log("AVERIGUANDO");
    const id = req.params.id
    let user = await users_service.find_user_by_id(id)
    if (user) {
        res.status(200).send(user);
    } else {
        res.send("No se encontró el usuario.")
    }
});

//Crear usuario
router.post('', authService.ensureAuthenticated, async (req, res, next) => {
    const user_param = req.body
    const saved_user = await users_service.add_user(user_param);
    if (saved_user) {
        res.send(saved_user);
    } else {
        res.send("No se pudo guardar el usuario.")
    }
});

module.exports = router;