const express = require('express');
const router = express.Router();
const { getTeamMembers } = require('../controllers/teamController'); // Import the controller


router.get('/team', getTeamMembers);

module.exports = router;
