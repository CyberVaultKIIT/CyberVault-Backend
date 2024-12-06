const express = require('express')
const { registerUser } = require('../controllers/auth/website/registerUser')
const { loginUser } = require('../controllers/auth/website/loginUser')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
