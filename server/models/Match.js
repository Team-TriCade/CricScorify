const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  tossWinner: String,
  electedTo: String,
  date: Date,
  status: String
});

module.exports = mongoose.model('Match', matchSchema);
