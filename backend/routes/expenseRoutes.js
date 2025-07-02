import express from 'express';
import {
  createExpense,
  getMyExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import {getExpenseSummary} from '../controllers/getExpenseSummary.js';

import protect from '../middleware/authMiddleware.js';
import { getMonthlyReport } from '../controllers/getMonthlyReport.js';


const router = express.Router();

router.post('/', protect, createExpense);
router.get('/', protect, getMyExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/summary', protect, getExpenseSummary);
router.get('/report/monthly', protect, getMonthlyReport);


export default router;
