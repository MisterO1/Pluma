const Group = require('../models/Group');

// Créer un Groupe
exports.createGroup = async (req, res) => {
  try {
    const item = new Group(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir tous les Groupes d’un projet
exports.getGroupsByProject = async (req, res) => {
  try {
    const items = await Group.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un Group par ID
exports.getGroupById = async (req, res) => {
  try {
    const item = await Group.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Group not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier
exports.updateGroup = async (req, res) => {
  try {
    const updated = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer
exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: 'Groupe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
