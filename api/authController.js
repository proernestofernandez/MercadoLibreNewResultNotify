const express = require('express');
const router = express.Router();

const authService = require('../services/authService');

//Login user
router.post('/login', authService.validate('login'), authService.login);

//Logout user
router.post('/logout', authService.ensureAuthenticated, authService.logout);

//isActiveSession user
router.get('/isActiveSession', authService.ensureAuthenticated, authService.isActiveSession);

module.exports = router;