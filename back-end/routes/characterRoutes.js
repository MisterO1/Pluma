const express = require('express');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

const {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
} = require('../controllers/characterController');

// CRUD des personnages
router.post('/', protect, createCharacter);
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', protect, updateCharacter);
router.delete('/:id', protect, deleteCharacter);

module.exports = router;
