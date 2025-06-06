const Match = require('../models/Match');

exports.createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate('teamA teamB');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('teamA teamB');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMatch) return res.status(404).json({ message: 'Match not found' });
    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
