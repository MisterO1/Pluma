const mongoose = require('mongoose');

require('./Project')

const characterSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    biography: {
        type: String,
        required: true,
        trim: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    appearance: {
        type: String,
        trim: true,
    },
    relationships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
        },
    ],
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
