const express = require('express')
const { createUser } = require('../controllers/user/createUser')
const { updateUser } = require('../controllers/user/updateUser')
const { changeUserStatus } = require('../controllers/user/changeUserStatus')
const {verifyToken} = require('../middleware/verifyToken')
const router = express.Router()
router.use(verifyToken)
router.post('/create-user', createUser)
router.post('/update-user', updateUser)
router.post('/change-user-access', changeUserStatus)

module.exports = router
