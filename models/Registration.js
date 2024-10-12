const mongoose = require('mongoose');



const RegistrationSchema = new mongoose.Schema({
  //formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  responseData: { type: Map, of: String, required: true }, // Example: storing dynamic key-value pairs of form answers
  created_at: { type: Date, default: Date.now }
},{
  timestamps: true // Enable timestamps
});

module.exports = mongoose.model('Registration', RegistrationSchema);
