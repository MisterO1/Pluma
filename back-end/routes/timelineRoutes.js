const express = require('express');
const router = express.Router();
const {
  createTimeline,
  getTimelinesByProject,
  getTimelineById,
  updateTimeline,
  deleteTimeline
} = require('../controllers/timelineController');

router.post('/', createTimeline);
router.get('/project/:projectId', getTimelinesByProject);
router.get('/:id', getTimelineById);
router.put('/:id', updateTimeline);
router.delete('/:id', deleteTimeline);

module.exports = router;
