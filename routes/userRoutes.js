const express = require('express')
const { createUser } = require('../controllers/user/createUser')
const { updateUser } = require('../controllers/user/updateUser')
const { changeUserStatus } = require('../controllers/user/changeUserStatus')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/create-user', auth.verifyToken, createUser)
router.patch('/update-user/:id', auth.verifyToken, updateUser)
router.patch('/change-user-access/:id', auth.verifyToken, changeUserStatus)

module.exports = router
