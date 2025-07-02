import mongoose from 'mongoose';
import Expense from '../models/expenseModel.js';

export const getExpenseSummary = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const expenses = await Expense.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalCount: { $sum: 1 }
        }
      }
    ]);

    const summary = expenses[0] || { totalAmount: 0, totalCount: 0 };

    res.json({
      totalAmount: summary.totalAmount,
      totalExpenses: summary.totalCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
};
