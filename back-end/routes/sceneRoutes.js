const express = require('express');
const router = express.Router();
const {
    createScene,
    getScenesByProject,
    getSceneById,
    updateScene,
    deleteScene
} = require('../controllers/sceneController');

// Routes
router.post('/', createScene);
router.get('/project/:projectId', getScenesByProject);
router.get('/:id', getSceneById);
router.put('/:id', updateScene);
router.delete('/:id', deleteScene);

module.exports = router;
