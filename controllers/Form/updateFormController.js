
const Form = require('../../models/Form'); 



const updateForm = async (req, res) => {

  try {
    const { formId, InfoObject, Controller_object, Topic_object, Sections, requiredSection, Optional } = req.body;

    
    const updatedForm = await Form.findOneAndUpdate(
      { _id: formId },
      {
        InfoObject,
        Controller_object,
        Topic_object,
        Sections,
        requiredSection,
        Optional,
      },
      { new: true } 
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form updated successfully', form: updatedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating form', error });
  }
};

module.exports = { updateForm };
