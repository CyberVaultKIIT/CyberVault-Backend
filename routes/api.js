const express = require('express')
const router = express.Router()

// Send the request to form routes
router.use('/form', require('./formRoutes'))
router.use('/auth', require('./authRoutes'))
router.use('/admin', require('./userRoutes'))
router.use('/payment', require('./paymentRoutes'))

module.exports = router
