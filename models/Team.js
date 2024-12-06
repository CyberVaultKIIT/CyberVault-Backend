const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true, // PK
  },
  Team_code: {
    type: String,
    required: true,
    unique: true, // Unique constraint
  },
  Team_name: {
    type: String,
    required: true,
    unique: true, // Unique constraint
  },
  TeamLeadId: {
    type: String,
    required: false,
  },
  Form_id: {
    type: String,
    required: true,
    unique: true, // Unique constraint and FK
  },
  Team_size: {
    type: Number,
    required: false,
  },
  CreatedOn: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  UpdatedOn: {
    type: Date,
    default: Date.now, // Automatically update when modified
  },
  Optional: {
    type: mongoose.Schema.Types.Mixed, // Can hold any type of value
    required: false,
  },
});

module.exports = mongoose.model('Team', TeamSchema);
