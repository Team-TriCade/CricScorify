const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  logo: String,
  ownerEmail: { type: String, required: true },
  players: [{ type: String, ref: 'Player' }]
});

module.exports = mongoose.model('Team', teamSchema);
