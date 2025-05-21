const Group = require('../models/Group');

// Create a group
exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create({ ...req.body, author: req.user._id });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all groups of a project
exports.getGroupsByProject = async (req, res) => {
  try {
    const groups = await Group.find({ project: req.params.projectId }).populate('members');
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    const updated = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
