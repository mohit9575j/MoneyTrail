import mongoose from 'mongoose';
import Expense from '../models/expenseModel.js';

export const getMonthlyReport = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const monthlyData = await Expense.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);

    const formatted = monthlyData.map(item => ({
      year: item._id.year,
      month: item._id.month,
      totalAmount: item.totalAmount,
      totalExpenses: item.count
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch monthly report' });
  }
};
