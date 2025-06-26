const express = require('express')
const { registerUser } = require('../controllers/auth/website/registerUser')
const { loginUser } = require('../controllers/auth/website/loginUser')
const { logoutUser } = require('../controllers/auth/website/logoutUser')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

module.exports = router
