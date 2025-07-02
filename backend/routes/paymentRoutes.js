// routes/paymentRoutes.js
import express from 'express';
import { createCashfreeOrder } from '../controllers/paymentController.js';
import { verifyPaymentSuccess } from '../controllers/verifyPayment.js';
import  protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createCashfreeOrder);
router.post('/verify-success', protect, verifyPaymentSuccess);

export default router;
