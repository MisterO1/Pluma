const express = require('express');
const cors = require('cors');
const app = express();
const { errorHandler } = require ('./middleware/errorMiddleware')

// Middlewares
app.use(cors());
app.use(express.json()); // pour parser le JSON
app.use(express.urlencoded({ extended : false}))

// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const characterRoutes = require('./routes/characterRoutes');
const sceneRoutes = require('./routes/sceneRoutes');
const groupRoutes = require('./routes/groupRoutes');
const powersystemRoutes = require('./routes/powersystemRoutes');
const timelineRoutes = require('./routes/timelineRoutes');

// Handle errorMiddleware
// app.use(notFound)
app.use(errorHandler)

// Route de base pour tester que l'API fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API de Pluma');
});

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/characters', characterRoutes);
// app.use('/api/scenes', sceneRoutes);
app.use('/api/groups', groupRoutes);
// app.use('/api/powersystem', powersystemRoutes);
// app.use('/api/timeline', timelineRoutes);

module.exports = app;
