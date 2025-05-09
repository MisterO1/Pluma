const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
    },
        description: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
        },
    ],
    status: {
        type: String,
        enum: ['draft', 'published', 'completed'],
        default: 'draft',
    },
    publicVisibility: {
        type: Boolean,
        default: false, // Contrôle si le projet est public ou privé
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{ 
    timestamps: true
}
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
