const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPayment } = require('../controllers/payment/createPaymentController');
const { getPaymentDetails } = require('../controllers/payment/getPaymentDetailsController');

router.post('/create', auth, createPayment);
router.get('/details/:paymentId', auth, getPaymentDetails);

module.exports = router;