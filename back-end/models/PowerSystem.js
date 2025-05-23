const mongoose = require('mongoose');

require('./Project')

const powersystemSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PowerSystem', powersystemSchema);
