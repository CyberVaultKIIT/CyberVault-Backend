const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Form', FormSchema);
