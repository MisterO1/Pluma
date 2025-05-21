const mongoose = require('mongoose');

require('./Project')
require('./User')
require('./Group')

const characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            trim: true,
            enum: ['human', 'object', 'animal', 'other'],
            default: "human",
            required: true,
        },
        age: {
            type: Number,
            min: 0,
        },
        sex: {
            type: String,
            enum: ['male', 'female', 'none'],
            default: "None",
            required: true,
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
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            trim: true,
            // required: true,
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { 
        timestamps: true
    }
);

// name unique per project
characterSchema.index({ name: 1, project: 1 }, { unique: true });

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
