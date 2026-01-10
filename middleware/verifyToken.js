// Authentication middleware
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization || req.cookie?.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Authentication token is required.' })
    }

    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findOne({ email: decodedToken.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    if (user.status !== 'active') {
      return res
        .status(403)
        .json({ message: 'Your account is inactive or suspended.' })
    }

    req.user = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    next()
  } catch (error) {
    console.error('Authentication Error:', error)
    return res
      .status(403)
      .json({ message: 'Invalid or expired token.', error: error.message })
  }
}
module.exports = { verifyToken };
