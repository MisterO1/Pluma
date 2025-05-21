const mongoose = require('mongoose');

require('./Project')
require('./Character')
require('./User')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['nation', 'clan', 'family', 'organization', 'race', 'tribe', 'religion', 'firm', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    trim: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character'
    }
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// A group must have at least 1 member
groupSchema.pre('validate', function (next) {
  if (!this.members || this.members.length === 0) {
    return next(new Error('A group must have at least 1 member'));
  }
  next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;