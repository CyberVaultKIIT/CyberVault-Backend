const express = require('express')
const { createUser } = require('../controllers/user/createUser')
const { updateUser } = require('../controllers/user/updateUser')
const { changeUserStatus } = require('../controllers/user/changeUserStatus')
const {verifyToken} = require('../middleware/verifyToken')
const router = express.Router()
router.use(verifyToken)
router.post('/create-user', createUser)
router.patch('/update-user/:id', updateUser)
router.patch('/change-user-access/:id', changeUserStatus)

module.exports = router
