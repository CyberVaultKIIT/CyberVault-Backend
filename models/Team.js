const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  teamCode: {
    type: String,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  teamLeadId: {
    type: String,
    required: false,
  },
  formId: {
    type: String,
    required: true,
    unique: true,
  },
  teamSize: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  optional: {
    type: mongoose.Schema.Types.Mixed, // Can hold any type of value
    required: false,
  },
});

module.exports = mongoose.model('Team', TeamSchema);
