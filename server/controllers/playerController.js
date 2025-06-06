const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
