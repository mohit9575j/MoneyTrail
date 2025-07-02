import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
