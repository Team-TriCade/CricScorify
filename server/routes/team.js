const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/createTeam', teamController.createTeam);
router.get('/getTeams', teamController.getTeams);
router.get('/:id/players', teamController.getTeamPlayers);

module.exports = router;
