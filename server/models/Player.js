const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  id: { type: String, required: true },
  role: String,
});

module.exports = mongoose.model('Player', playerSchema);
