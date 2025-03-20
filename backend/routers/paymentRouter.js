import express from 'express';
import { getAllPayment, proocessRefund } from '../controllers/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.get('/',getAllPayment);
paymentRouter.patch('/:id/refund', proocessRefund);

export default paymentRouter;