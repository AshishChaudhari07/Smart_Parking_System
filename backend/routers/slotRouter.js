import express from 'express'
import { addParkingSlot, deleteParkingSlot, getSlotById, getSlotsByParkingId, updateParkingSlot } from '../controllers/parkerSlotController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const slotRouter = express.Router();

slotRouter.post('/add', authMiddleware, addParkingSlot);
slotRouter.get('/:parkingId', authMiddleware, getSlotsByParkingId);
slotRouter.get('/:id', authMiddleware, getSlotById);
slotRouter.put('/:id', authMiddleware, updateParkingSlot);
slotRouter.delete('/:id', authMiddleware, deleteParkingSlot);


export default slotRouter;