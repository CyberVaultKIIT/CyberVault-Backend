const Form = require('../models/Form');

exports.createForm = async (req, res) => {
  const newForm = new Form(req.body);
  try {
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(500).json(err);
  }
};
