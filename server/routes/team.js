const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/getTeams', teamController.getTeams);

module.exports = router;
