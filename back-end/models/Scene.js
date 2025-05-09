const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        enum: ['épique', 'dramatique', 'romantique', 'décisive', 'autre'],
        default: 'autre',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Scene', sceneSchema);
