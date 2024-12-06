const mongoose = require('mongoose');

const payment = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  txnId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'],
  },
  txnDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'],
  },
  description: {
    type: String,
    default: null,
  },
  optional: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const Payment = mongoose.model('Payment', payment);

module.exports = Payment;
