import express from 'express'
import { cancelReservation, createReservation, getAllReservation, getReservationById, getReservationsByUser, updateReservation } from '../controllers/reservationCntroller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const reservationRouter = express.Router();

reservationRouter.post('/add', createReservation);
reservationRouter.get('/all', getAllReservation);
reservationRouter.get('/user/:id', authMiddleware, getReservationsByUser);
reservationRouter.get('/reservation/:id', authMiddleware, getReservationById);
reservationRouter.put('/user/:id', authMiddleware, updateReservation);
reservationRouter.delete('/delete/:id', authMiddleware, cancelReservation);

export default reservationRouter;