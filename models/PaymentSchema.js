const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  Payment_id: {
    type: String,
    required: true,
    unique: true
  },
  Txn_id: {
    type: String,
    required: true
  },
  User_id: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  Txn_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  Payment_method: {
    type: String,
    required: true
  },
  Description: {
    type: String
  },
  Optional: {
    type: mongoose.Schema.Types.Mixed
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
