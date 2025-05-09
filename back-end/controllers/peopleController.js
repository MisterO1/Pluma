const People = require('../models/People');

// Créer un(e) people
exports.createPeople = async (req, res) => {
  try {
    const item = new People(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir tous les peoples d’un projet
exports.getPeoplesByProject = async (req, res) => {
  try {
    const items = await People.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un(e) people par ID
exports.getPeopleById = async (req, res) => {
  try {
    const item = await People.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'People non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier
exports.updatePeople = async (req, res) => {
  try {
    const updated = await People.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer
exports.deletePeople = async (req, res) => {
  try {
    await People.findByIdAndDelete(req.params.id);
    res.json({ message: 'People supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
