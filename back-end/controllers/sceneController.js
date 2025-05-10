const Scene = require('../models/Scene');

// Créer une nouvelle scène
exports.createScene = async (req, res) => {
    try {
        const scene = new Scene(req.body);
        const saved = await scene.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtenir toutes les scènes d’un projet
exports.getScenesByProject = async (req, res) => {
    try {
        const scenes = await Scene.find({ project: req.params.projectId });
        res.json(scenes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir une scène par ID
exports.getSceneById = async (req, res) => {
    try {
        const scene = await Scene.findById(req.params.id);
        if (!scene) return res.status(404).json({ message: 'Scène non trouvée' });
        res.json(scene);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Modifier une scène
exports.updateScene = async (req, res) => {
    try {
        const scene = await Scene.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(scene);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer une scène
exports.deleteScene = async (req, res) => {
    try {
        await Scene.findByIdAndDelete(req.params.id);
        res.json({ message: 'Scène supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
