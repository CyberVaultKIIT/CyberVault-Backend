const express = require('express')
const { createUser } = require('../controllers/user/createUser')
const { updateUser } = require('../controllers/user/updateUser')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/create-user', auth, createUser)
router.patch('/update-user/:id', auth, updateUser)

module.exports = router
