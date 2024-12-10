const Payment = require('../../models/payment');

const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({
      _id: paymentId,
      userId: req.user.userId
    }).populate('userId');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment details retrieved', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving payment details', error });
  }
};

module.exports = { getPaymentDetails };