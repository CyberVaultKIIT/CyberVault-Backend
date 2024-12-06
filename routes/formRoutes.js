const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');


router.post('/saveResponse', registrationController.saveResponse);

// Additional routes can be added here

module.exports = router;
