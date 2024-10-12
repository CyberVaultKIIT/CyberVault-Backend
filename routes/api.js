const express = require('express');
const router = express.Router();

// Send the request to form routes
router.use("/form",require("./formRoutes"))


module.exports = router;
