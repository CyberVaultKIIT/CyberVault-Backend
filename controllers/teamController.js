const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
  const newTeam = new Team(req.body);
  try {
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getTeamMember = async (req, res) => {
  try {
    // Fetch all users where isActive is true
    const users = await User.find({ status: "active", team: {"$exists": true, "$nin":[null, ""]}});

    // If no users found, return a 404 response
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    // Success response
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching team members",
      error: error.message
    });
  }
};
