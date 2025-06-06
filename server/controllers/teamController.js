const Team = require('../models/Team');

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
    const teams = await Team.find().populate('players');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};