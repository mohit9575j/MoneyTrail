import express from 'express';
import { markUserAsPaid } from '../controllers/IsTrue.js';
import  protect  from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/payment/mark-paid
router.post('/mark-paid', protect, markUserAsPaid);

export default router;
