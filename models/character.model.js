// models/character.model.js
const mongoose = require('mongoose');


const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true 
    },
    species: {
        type: String, 
        default: 'Normie'
    },
    ability: {
        type: String 
    }
}, {
    
    timestamps: true 
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;