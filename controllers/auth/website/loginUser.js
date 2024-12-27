require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../../models/User')

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password ) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({ message: 'No user Found' })
    }

    if(user.status == "suspended"){
      return res.status(401).json({ message: 'Your account has been suspended.' })
    }
    const userPassword = user.password
    const isValidPassword = await bcrypt.compare(password, userPassword)

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '10h' },
    )
    user.password= undefined;
    user.phoneNumber= undefined;

    res.cookie('Authorization', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    })

    return res.status(200).send({
      message: 'User Logged In Successfully',
      data: user,
      token: token,
    })
  } 
  
  catch (error) {
    return res
      .status(500)
      .json({ message: 'Error finding user', error: error.message })
  }
}

module.exports = { loginUser }
