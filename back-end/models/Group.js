const mongoose = require('mongoose');

require('./Project')
require('./Character')

const groupSchema = new mongoose.Schema({
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
    default: 'Project\'s Universe',
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Character',
  }],
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Group', groupSchema);
