require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../../models/User')

const registerUser = async (req, res) => {
  const {
    userId,
    name,
    email,
    password,
    phoneNumber,
    branch,
    roll,
    batch,
    year,
    createdAt,
    updatedAt,
    socialLinks,
    optional,
  } = req.body

  if (!userId || !name || !email || !password || !roll) {
    return res.status(400).json({ message: 'Please fill all the fields' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      userId,
      name,
      email,
      passwordHash: hashedPassword,
      phoneNumber,
      branch,
      roll,
      batch,
      year,
      createdAt,
      updatedAt,
      socialLinks,
      optional,
    })
    await user.save()

    // Generate JWT
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    )

    if (!token) {
      return res.status(500).json({ message: 'Failed to generate token' })
    }

    // Set token in the cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    })

    return res
      .status(201)
      .json({ message: 'User created successfully', data: user, token: token })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error creating user', error: error.message })
  }
}

module.exports = { registerUser }