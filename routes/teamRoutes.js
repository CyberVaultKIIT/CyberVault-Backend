const express = require('express');
const router = express.Router();
const {createTeam, getTeamMember} = require("../controllers/teamController.js");
 
router.post('/create-team', createTeam);
router.get("/team", getTeamMember);

// Additional routes can be added here

module.exports = router;
