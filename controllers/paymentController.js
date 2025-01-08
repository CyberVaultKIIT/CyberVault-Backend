const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const newPayment = new Payment(req.body);
  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json(err);
  }
};