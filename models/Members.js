const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [2, 'Name must be at least 2 characters long']
  },
  number: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  website: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true,
    match: [/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/, 'Please provide a valid GitHub URL']
  },
  linkedin: {
    type: String,
    required: [true, 'LinkedIn URL is required'],
    trim: true,
    match: [/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/, 'Please provide a valid LinkedIn URL']
  },
  twitter: {
    type: String,
    required: [true, 'Twitter URL is required'],
    trim: true,
    match: [/^https:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/, 'Please provide a valid Twitter URL']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  batch: {
    type: String,
    trim: true
  },
  profileImage: {
    data: Buffer,
    contentType: String,
    filename: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('members', memberSchema);
