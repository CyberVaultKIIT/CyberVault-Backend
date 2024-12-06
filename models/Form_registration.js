const mongoose = require('mongoose');

const FormRegistrationSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  }, 
  userId: { 
    type: String, 
    required: true 
  },
  team_id: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  response: { 
    type: mongoose.Schema.Types.Mixed 
  }, 
});

module.exports = mongoose.model('FormRegistration', FormRegistrationSchema);
