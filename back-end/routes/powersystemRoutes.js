const express = require('express');
const router = express.Router();
const {
  createPowerSystem,
  getPowerSystemsByProject,
  getPowerSystemById,
  updatePowerSystem,
  deletePowerSystem
} = require('../controllers/powersystemController');

router.post('/', createPowerSystem);
router.get('/project/:projectId', getPowerSystemsByProject);
router.get('/:id', getPowerSystemById);
router.put('/:id', updatePowerSystem);
router.delete('/:id', deletePowerSystem);

module.exports = router;
