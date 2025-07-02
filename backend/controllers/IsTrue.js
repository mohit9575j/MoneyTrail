import User from '../models/userModel.js';

export const markUserAsPaid = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isPaid: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User marked as paid', user });
  } catch (error) {
    console.error('❌ Error marking user as paid:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
