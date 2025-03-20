import express from 'express'
import { cancelReservation, createReservation, getAllReservation, getReservationById, getReservationsByUser, updateReservation } from '../controllers/reservationCntroller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const reservationRouter = express.Router();

reservationRouter.post('/add', authMiddleware, createReservation);
reservationRouter.get('/all', getAllReservation);
reservationRouter.get('/user/:id', authMiddleware, getReservationsByUser);
reservationRouter.get('/:id', authMiddleware, getReservationById);
reservationRouter.put('/:id', authMiddleware, updateReservation);
reservationRouter.delete('/:id', authMiddleware, cancelReservation);

export default reservationRouter;