import express from 'express'
import { addLocation, deleteLocation, getAllLocations, getLocationById, updateLocation } from '../controllers/locationController.js'

const locationRouter = express.Router()

locationRouter.post('/add', addLocation);
locationRouter.get('/all', getAllLocations);
locationRouter.get('/single/:id', getLocationById);
locationRouter.put('/update/:id', updateLocation);
locationRouter.delete('/delete/:id', deleteLocation);

export default locationRouter;