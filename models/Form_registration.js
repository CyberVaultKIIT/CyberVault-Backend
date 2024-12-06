const mongoose = require('mongoose');

const FormRegistrationSchema = new mongoose.Schema({
  ID: { type: String, required: true, unique: true }, // Primary Key
  UserId: { type: String, required: true },
  Team_id: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  Response: { type: mongoose.Schema.Types.Mixed }, // Mixed type for flexibility
});

module.exports = mongoose.model('FormRegistration', FormRegistrationSchema);
