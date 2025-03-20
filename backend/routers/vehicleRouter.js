import express from 'express';
import { addVehicle, deleteVehicle, getUserVehicles, getVehicleById, updateVehicle } from '../controllers/vehicleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add', authMiddleware, addVehicle);
vehicleRouter.get('/user/:userId', authMiddleware, getUserVehicles);
vehicleRouter.get('/:id', authMiddleware, getVehicleById);
vehicleRouter.put('/:id', authMiddleware, updateVehicle);
vehicleRouter.delete('/:id', authMiddleware, deleteVehicle);

export default vehicleRouter;