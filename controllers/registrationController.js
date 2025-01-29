const Registration = require('../models/Registration'); 
const Logger = require('../utils/Logger');

const saveResponse = async (req, res) => {
 

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


const getForm = async (req, res) => {
  const { formId } = req.params;
  try {
      res.status(200).json({ message: `Form Fetched Successfully with ${formId}`, form: {} });
  }
  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Fetching form', error });
  }
};


module.exports = { saveResponse,getForm };
