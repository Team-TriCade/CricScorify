const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Player', playerSchema);
