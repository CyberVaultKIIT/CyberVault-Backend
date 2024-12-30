const Form = require('../../models/Form'); 



const createForm = async (req, res) => {
  try {
    const { infoObject, controllerObject, topicObject, sections, requiredSection, optional } = req.body;

    
    const newForm = new Form({
      infoObject,
      controllerObject,
      topicObject,
      sections,
      requiredSection,
      optional,
    });

  
    await newForm.save();
    res.status(201).json({ message: 'Form created successfully', form: newForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating form', error });
  }
};

module.exports = { createForm };
