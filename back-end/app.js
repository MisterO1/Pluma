const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API de la plateforme de projets d’écriture');
});

module.exports = app;