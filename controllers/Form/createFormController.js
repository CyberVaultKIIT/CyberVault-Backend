const Form = require('../../models/Form'); 



const createForm = async (req, res) => {

  try {
    const { Info_object, Controller_object, Topic_object, Sections, requiredSection, Optional } = req.body;

    
    const newForm = new Form({
      Info_object,
      Controller_object,
      Topic_object,
      Sections,
      requiredSection,
      Optional,
    });

  
    await newForm.save();
    res.status(201).json({ message: 'Form created successfully', form: newForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating form', error });
  }
};

module.exports = { createForm };
