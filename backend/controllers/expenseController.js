import Expense from '../models/expenseModel.js';

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error creating expense' });
  }
};

// Get All Expenses (Logged-in user only)
export const getMyExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = {
      user: req.user.id,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { amount: isNaN(Number(search)) ? -1 : Number(search) }  
      ]
    };

     if (!search || isNaN(Number(search))) {
      searchQuery.$or.pop(); 
    }

    const totalExpenses = await Expense.countDocuments(searchQuery);
    const expenses = await Expense.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      totalExpenses,
      currentPage: Number(page),
      totalPages: Math.ceil(totalExpenses / limit),
      expenses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};


// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    const { title, amount, category } = req.body;
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;

    const updated = await expense.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating expense' });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
