const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
  },
  roll: {
    type: String,
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
      'leadWeb',
      'leadEventManagement',
      'leadCoreCyber',
      'leadContentCreation',
      'leadMarketing',
      'leadBroadcasting',
      'leadDesigning',
      'member',
      'user',
    ],
    default: 'user',
  },
  team: {
    type: String,
    enum: [
      'web',
      'eventManagement',
      'coreCyber',
      'contentCreation',
      'marketing',
      'broadcasting',
      'designing',
    ],
    default: null,
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
