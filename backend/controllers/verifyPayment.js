// controllers/paymentController.js
import User from '../models/userModel.js';

export const verifyPaymentSuccess = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isPaid = true;
    user.paymentInfo = {
      orderId,
      status: 'success',
      amount: 499,
      paidAt: new Date()
    };

    await user.save();

    res.status(200).json({ message: 'Payment verified. User is now premium.' });
  } catch (error) {
    console.error('Verify payment failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
