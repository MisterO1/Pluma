const mongoose = require('mongoose');

require('./Project')

const characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            min: 0
        },
        role: {
            type: String,
            trim: true,
        },
        biography: {
            type: String,
            trim: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        imageUrl: {
            type: String,
            trim: true,
            default: "../front-end/assets/default.avif",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true,
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

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
