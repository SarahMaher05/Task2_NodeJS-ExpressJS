// controllers/character.controller.js

const Character = require('../models/character.model');


exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.render('allCharacters', { characters: characters });
    } catch (error) {
        res.send(error.message);
    }
};


exports.showCreateForm = (req, res) => {
    res.render('createCharacter');
};

// --- (Create) ---

exports.createCharacter = async (req, res) => {
    try {
        const newCharacter = new Character(req.body);
        await newCharacter.save();
        res.redirect('/characters');
    } catch (error) {
        res.send(error.message);
    }
};

// --- (Read) ---

exports.showEditForm = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        res.render('editCharacter', { character: character });
    } catch (error) {
        res.send(error.message);
    }
};

// --- (Update) ---

exports.updateCharacter = async (req, res) => {
    try {
        await Character.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/characters');
    } catch (error) {
        res.send(error.message);
    }
};

// --- (Delete) ---

exports.deleteCharacter = async (req, res) => {
    try {
        await Character.findByIdAndDelete(req.params.id);
        res.redirect('/characters');
    } catch (error) {
        res.send(error.message);
    }
};

// --- (Read) - Search ---

exports.searchCharacters = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const characters = await Character.find({
            name: { $regex: searchQuery, $options: 'i' }
        });
        res.render('allCharacters', { characters: characters });
    } catch (error) {
        res.send(error.message);
    }
};