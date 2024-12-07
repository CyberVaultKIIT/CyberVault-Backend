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
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
  },
  roll: {
    type: Number,
    required: true,
    unique: true,
  },
  batch: {
    type: Number,
  },
  year: {
    type: Number,
  },
  role: {
    type: String,
    enum: [
      'admin',
      'web',
      'leadWeb',
      'eventManagement',
      'leadEventManagement',
      'coreCyber',
      'leadCoreCyber',
      'contentCreation',
      'leadContentCreation',
      'marketing',
      'leadMarketing',
      'broadcasting',
      'leadBroadcasting',
      'designing',
      'leadDesigning',
      'user',
    ],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  history: [
    {
      timestamp: { type: Date, default: Date.now },
      document: { type: Object, required: true },
    },
  ],
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
