const Registration = require('../models/Registration'); 
const Logger = require('../utils/Logger');

const saveResponse = async (req, res) => {
  // console.log("Entering saveResponse function");

  const { responseData } = req.body;
  try {
    // Create a new response (no need for formId)
    const newResponse = new Registration({
      responseData     // Save the form's response data
    });

    const savedResponse = await newResponse.save();
    Logger.log("Response saved successfully:\n", savedResponse);
    res.status(201).json(savedResponse);

  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to save response', details: err.message });
    }
  }
};

module.exports = { saveResponse };
