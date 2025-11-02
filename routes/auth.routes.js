// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.get('/register', authController.showRegisterForm);

router.get('/login', authController.showLoginForm);

router.get('/logout', authController.logoutUser);

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;