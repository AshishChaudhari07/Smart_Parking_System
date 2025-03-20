import Vehicle from "../models/vehicleModel.js";


// Add a new vehicle
const addVehicle = async (req, res) => {
    try {
        const { userId, registrationNum, vehicleType } = req.body;
        const newVehicle = new Vehicle({ userId, registrationNum, vehicleType });
        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error });
    }
};

// Retrieve vehicles of a user
const getUserVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ userId: req.params.userId });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user vehicles', error });
    }
};

// Retrieve vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle', error });
    }
};

// Update vehicle details
const updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error });
    }
};

// Remove a vehicle
const deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error });
    }
};


export { addVehicle, getUserVehicles, getVehicleById, updateVehicle, deleteVehicle };