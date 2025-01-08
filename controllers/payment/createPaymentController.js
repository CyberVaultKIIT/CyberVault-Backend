const Payment = require('../../models/Payment');

const createPayment = async (req, res) => {
  try {
    const {
      paymentId,
      txnId,
      userId,
      amount,
      status,
      paymentMethod,
      description
    } = req.body;

    const authenticatedUserId = req.user.userId;

    const newPayment = new Payment({
      paymentId,
      txnId,
      userId: authenticatedUserId,
      amount,
      status,
      paymentMethod,
      description
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payment', error });
  }
};

module.exports = { createPayment };