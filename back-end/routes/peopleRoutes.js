const express = require('express');
const router = express.Router();
const {
  createPeople,
  getPeoplesByProject,
  getPeopleById,
  updatePeople,
  deletePeople
} = require('../controllers/peopleController');

router.post('/', createPeople);
router.get('/project/:projectId', getPeoplesByProject);
router.get('/:id', getPeopleById);
router.put('/:id', updatePeople);
router.delete('/:id', deletePeople);

module.exports = router;
