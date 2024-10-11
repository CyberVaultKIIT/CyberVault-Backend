const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  whatsapp_number: { type: String, required: true }
}, {
  timestamps: true // Enable timestamps
});

module.exports = mongoose.model('Registration', RegistrationSchema);
