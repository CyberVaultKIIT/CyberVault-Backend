const express = require('express')
const { createUser, updateUser, deleteUser } = require('../controllers/user')
// const { updateUser } = require('../controllers/user/updateUser')
// const { deleteUser } = require('../controllers/user/deleteUser')
const {verifyToken} = require('../middleware/verifyToken.js')
const {checkAccess} = require('../middleware/checkAccess.js')
const router = express.Router()
router.use(verifyToken)
router.use(checkAccess("admin"))
router.post('/create-user', createUser)
router.post('/update-user', updateUser)
router.post('/delete-user', deleteUser)

module.exports = router
