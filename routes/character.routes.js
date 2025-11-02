// routes/character.routes.js (Version 2 - Secured)

const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character.controller');


const isAuth = require('../middleware/auth.middleware');


router.use(isAuth);

router.get('/', characterController.getAllCharacters);

router.get('/new', characterController.showCreateForm);

router.get('/edit/:id', characterController.showEditForm);

router.get('/search', characterController.searchCharacters);

router.post('/create', characterController.createCharacter);

router.post('/update/:id', characterController.updateCharacter);

router.post('/delete/:id', characterController.deleteCharacter);

module.exports = router;