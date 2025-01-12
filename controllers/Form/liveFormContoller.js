const Form = require('../../models/Form');

const getLiveForm = async (req, res) => {
  try {
    // Fetch live forms where `isLive` is true
    const liveForms = await Form.findOne({ "controllerObject.isLive": true });

    // If no forms are found, return a 404 response
    if (!liveForms) {
      return res.status(404).json({ message: 'No live forms found' });
    }

    // Return the live forms in the response
    res.status(200).json({ message: 'Live forms retrieved successfully', data: liveForms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving live forms', error });
  }
};

module.exports = { getLiveForm };
