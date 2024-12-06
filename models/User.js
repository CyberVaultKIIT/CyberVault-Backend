const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  branch: {
    type: String,
  },
  roll: {
    type: Number,
    required: true,
  },
  batch: {
    type: Number,
  },
  year: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  socialLinks: [
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
