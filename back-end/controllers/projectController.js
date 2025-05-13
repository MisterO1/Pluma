const Project = require('../models/Project');

// Créer un projet
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create({...req.body, author: req.user._id});
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lire tous les projets
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('author characters');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lire un projet par ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('author characters');
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un projet
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, {...req.body, author: req.user._id}, {
        new: true,
        });
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json({ message: 'Projet supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

