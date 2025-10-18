const express = require("express");
const router = express.Router();

// Send the request to form routes
router.use("/form", require("./formRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/admin", require("./userRoutes"));
router.use("/event", require("./eventRoutes"));

module.exports = router;
