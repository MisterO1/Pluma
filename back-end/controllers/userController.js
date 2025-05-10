const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Génère un JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    };

// Enregistre un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'mot de passe incorrect' });//à changer plus tard

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
    });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Profil utilisateur (protégé)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');//q
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Récupère les projets d’un utilisateur donné
const Project = require('../models/Project');

exports.getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.params.id });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
    }
};