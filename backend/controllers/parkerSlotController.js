import ParkingSlot from "../models/parkingSlotModel.js";


// Add new parking slot
const addParkingSlot = async (req, res) => {
    try {
        const { parkingId, floor, parkingTag, active, minimumParkingMinutes, suvSupported } = req.body;
        const newSlot = new ParkingSlot({ parkingId, floor, parkingTag, active, minimumParkingMinutes, suvSupported });
        await newSlot.save();
        res.status(201).json({ message: 'Parking slot added successfully', slot: newSlot });
    } catch (error) {
        res.status(500).json({ message: 'Error adding parking slot', error });
    }
};

// Fetch slots of a parking lot
const getSlotsByParkingId = async (req, res) => {
    try {
        const slots = await ParkingSlot.find({ parkingId: req.params.parkingId });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots', error });
    }
};

// Retrieve parking slot details
const getSlotById = async (req, res) => {
    try {
        const slot = await ParkingSlot.findById(req.params.id);
        if (!slot) return res.status(404).json({ message: 'Parking slot not found' });
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slot', error });
    }
};

// Update slot details
const updateParkingSlot = async (req, res) => {
    try {
        const updatedSlot = await ParkingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSlot) return res.status(404).json({ message: 'Parking slot not found' });
        res.status(200).json({ message: 'Parking slot updated successfully', slot: updatedSlot });
    } catch (error) {
        res.status(500).json({ message: 'Error updating parking slot', error });
    }
};

// Remove a slot
const deleteParkingSlot = async (req, res) => {
    try {
        const deletedSlot = await ParkingSlot.findByIdAndDelete(req.params.id);
        if (!deletedSlot) return res.status(404).json({ message: 'Parking slot not found' });
        res.status(200).json({ message: 'Parking slot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting parking slot', error });
    }
};

export {
    addParkingSlot,
    getSlotsByParkingId,
    getSlotById,
    updateParkingSlot,
    deleteParkingSlot
};