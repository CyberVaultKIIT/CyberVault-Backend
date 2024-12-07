const bcrypt = require('bcrypt')
const User = require('../../models/User')

const createUser = async (req, res) => {
  try {
    const { user } = req
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access.' })
    }

    const allowedRoles = [
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
    ]

    if (user.status !== 'active' || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'Access denied. You do not have permission to create users.',
      })
    }

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
      role,
      socialLinks,
      optional,
    } = req.body

    if (!userId || !name || !email || !password || !roll) {
      return res.status(400).json({ message: 'Please fill all the fields' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'User with the same email or roll number already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      userId,
      name,
      email,
      passwordHash: hashedPassword,
      phoneNumber,
      branch,
      roll,
      batch,
      year,
      role,
      socialLinks,
      optional,
    })

    await newUser.save()

    return res.status(201).json({
      message: 'User created successfully.',
      user: newUser,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({
      message: 'An error occurred while creating the user.',
      error: error.message,
    })
  }
}

module.exports = { createUser }
