const Team = require('../models/Team');
const Player = require('../models/Player');

exports.createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamPlayers = async (req, res) => {
  try {
    const team = await Team.findOne({ teamId: req.params.id }).populate('players');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team.players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

