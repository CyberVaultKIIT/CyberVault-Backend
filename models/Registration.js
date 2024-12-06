const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  responseData: { 
    type: Object, 
    required: true 
  }
},{
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Registration', RegistrationSchema);
