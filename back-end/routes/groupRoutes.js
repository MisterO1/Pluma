const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createGroup,
  getGroupsByProject,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../controllers/groupController');

// All routes are protected
router.post('/', protect, createGroup);
router.get('/project/:projectId', protect, getGroupsByProject);
router.get('/:id', protect, getGroupById);
router.put('/:id', protect, updateGroup);
router.delete('/:id', protect, deleteGroup);

module.exports = router;
