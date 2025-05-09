const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const sceneRoutes = require('./routes/sceneRoutes');
app.use('/api/scenes', sceneRoutes);

const peopleRoutes = require('./routes/peopleRoutes')
app.use('/api/peoples', peopleRoutes);

const powersystemRoutes = require('./routes/powersystemRoutes')
app.use('/api/powersystem', powersystemRoutes);

const timelineRoutes = require('./routes/timelineRoutes')
app.use('/api/timeline', timelineRoutes);