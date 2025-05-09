const express = require('express');
const router = express.Router();
const {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
} = require('../controllers/characterController');

// CRUD des personnages
router.post('/', createCharacter);
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
