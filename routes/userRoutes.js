const express = require('express')
const { createUser } = require('../controllers/user/createUser')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/create-user', auth, createUser)

module.exports = router
