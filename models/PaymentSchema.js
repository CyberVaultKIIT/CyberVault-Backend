const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
  Payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  Txn_id: {
    type: String,
    required: true,
  },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Failed'],
  },
  Txn_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Payment_method: {
    type: String,
    required: true,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'],
  },
  Description: {
    type: String,
    default: null,
  },
  Optional: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const Payments = mongoose.model('Payments', PaymentsSchema);

module.exports = Payments;
