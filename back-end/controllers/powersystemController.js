const PowerSystem = require('../models/PowerSystem');

// Créer un(e) powersystem
exports.createPowerSystem = async (req, res) => {
  try {
    const item = new PowerSystem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir tous les powersystems d’un projet
exports.getPowerSystemsByProject = async (req, res) => {
  try {
    const items = await PowerSystem.find({ project: req.params.projectId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un(e) powersystem par ID
exports.getPowerSystemById = async (req, res) => {
  try {
    const item = await PowerSystem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'PowerSystem non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier
exports.updatePowerSystem = async (req, res) => {
  try {
    const updated = await PowerSystem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer
exports.deletePowerSystem = async (req, res) => {
  try {
    await PowerSystem.findByIdAndDelete(req.params.id);
    res.json({ message: 'PowerSystem supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
