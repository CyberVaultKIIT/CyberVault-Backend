const mongoose = require('mongoose')

// Defining the User schema
const UserSchema = new mongoose.Schema({
  User_id: {
    // Primary Key (PK) for the user
    type: String,
    required: true, // The field is mandatory
  },
  Name: {
    // User's name
    type: String,
    required: true, // The field is mandatory
  },
  Email: {
    // Unique constraint (U) for user's email
    type: String,
    required: true, // The field is mandatory
  },
  Password_hash: {
    // Hashed password for security
    type: String,
    required: true, // The field is mandatory
  },
  Phone_number: {
    // Unique constraint (U) for user's phone number
    type: Number,
  },
  Branch: {
    // User's branch of study or department
    type: String,
  },
  Roll: {
    // Roll number of the student
    type: Number,
    required: true, // The field is mandatory
  },
  Batch: {
    // Batch number the user belongs to
    type: Number,
  },
  Year: {
    // Year of study or year of graduation
    type: Number,
  },
  Created_at: {
    // Timestamp for user creation
    type: Date,
    default: Date.now, // Sets the default to the current date
    required: true, // The field is mandatory
  },
  Updated_at: {
    // Timestamp for user data updates
    type: Date,
    default: Date.now, // Sets the default to the current date
    required: true, // The field is mandatory
  },
  social_links: [
    // Array to store social media links
    {
      type: {
        type: String, // Type of social link (e.g., LinkedIn, GitHub)
        required: true, // The field is mandatory
      },
      url: { type: String, required: true }, // URL of the social link
    },
  ],
  optional: { type: mongoose.Schema.Types.Mixed }, // Flexible field that can store any data type (e.g., additional info)
})

// Create a Mongoose model using the schema
const User = mongoose.model('User', UserSchema)

// Export the User model for use in other parts of the application
module.exports = User
