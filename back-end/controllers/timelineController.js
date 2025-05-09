const Timeline = require('../models/Timeline');

// Créer un(e) timeline
exports.createTimeline = async (req, res) => {
  try {
    const item = new Timeline(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir tous les timelines d’un projet
exports.getTimelinesByProject = async (req, res) => {
  try {
    const items = await Timeline.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un(e) timeline par ID
exports.getTimelineById = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Timeline non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier
exports.updateTimeline = async (req, res) => {
  try {
    const updated = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer
exports.deleteTimeline = async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timeline supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
