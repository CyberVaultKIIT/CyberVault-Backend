const mongoose = require('mongoose')

// Define User Schema
const UserSchema = new mongoose.Schema({
  User_id: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password_hash: {
    type: String,
    required: true,
  },
  Phone_number: {
    type: Number,
  },
  Branch: {
    type: String,
  },
  Roll: {
    type: Number,
    required: true,
  },
  Batch: {
    type: Number,
  },
  Year: {
    type: Number,
  },
  Created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  social_links: [
    {
      type: {
        type: String,
        required: true,
      },
      url: { type: String, required: true },
    },
  ],
  optional: { type: mongoose.Schema.Types.Mixed },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
