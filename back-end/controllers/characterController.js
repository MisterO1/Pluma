const Character = require('../models/Character');
const Project = require('../models/Project');

// create a character
exports.createCharacter = async (req, res) => {
    try {
        const { name, age, role, biography, imageUrl, project } = req.body;
        const character = await Character.create({...req.body, author: req.user._id});

        // Ajoute le personnage au projet
        await Project.findByIdAndUpdate(project, {
            $push: { characters: character._id }
        });

        res.status(201).json(character);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all characters from a project
exports.getAllCharactersFromProject = async (req, res) => {
    try {
        const project = await Project.findById(req.projectId).populate('characters')
        const characters = project.characters
        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific character by his ID
exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id).populate('project');
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json(character);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a character by his ID
exports.updateCharacter = async (req, res) => {
    try {
        const character = await Character.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json(character);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a specific character by his ID
exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json({ message: 'Character deteled' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
