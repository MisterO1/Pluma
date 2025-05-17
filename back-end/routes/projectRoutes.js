const express = require('express');
const protect = require('../middleware/authMiddleware')
const router = express.Router();
const {
    createProject,
    getAllProjects,
    getProjectsByUser,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

// CRUD
router.post('/',protect, createProject);
router.get('/',protect, getProjectsByUser);
router.get('/:id', getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;