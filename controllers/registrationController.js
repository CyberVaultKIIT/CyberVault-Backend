const Registration = require('../models/Registration'); // Assuming the Response model is saved here
const Form = require('../models/Form');         // Import the Form model
const { json } = require('express');

const saveResponse = async (req, res) => {
  console.log("Entering this function")
  const { formId } = req.body;
  const responseData=json.parse(resquest.body.responseData)
  try {
    // Ensure the form exists before saving the response
    // const formExists = await Form.findById(formId);
    /*if (!formExists) {
      return res.status(404).json({ error: 'Form not found' });
    }*/

    // Create a new response tied to the form
    const newResponse = new Registration({
      formId,
      responseData
    });

    const savedResponse = await newResponse.save();
    console.log("Resoponse saved successfully",savedResponse)
    res.status(201).json(savedResponse);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to save response', details: err.message });
    }
  }
};
module.exports={saveResponse}