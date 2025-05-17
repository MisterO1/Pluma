const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // pour parser le JSON

// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const characterRoutes = require('./routes/characterRoutes');
const sceneRoutes = require('./routes/sceneRoutes');
const groupRoutes = require('./routes/groupRoutes');
const powersystemRoutes = require('./routes/powersystemRoutes');
const timelineRoutes = require('./routes/timelineRoutes');

// Route de base pour tester que l'API fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API de Pluma');
});

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/scenes', sceneRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/powersystem', powersystemRoutes);
app.use('/api/timeline', timelineRoutes);

module.exports = app;
