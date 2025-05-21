const express = require('express')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

const {
    createCharacter,
    getAllCharactersFromProject,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
} = require('../controllers/characterController')

// CRUD des personnages
router.post('/', protect, createCharacter)
router.get('/', protect, getAllCharactersFromProject)
router.get('/:id', getCharacterById)
router.put('/:id', protect, updateCharacter)
router.delete('/:id', protect, deleteCharacter)


module.exports = router;
