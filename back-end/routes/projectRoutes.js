const express = require('express');
const protect = require('../middleware/authMiddleware')
const router = express.Router();
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

// CRUD
router.post('/',protect, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;