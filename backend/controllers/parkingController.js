import Parking from "../models/addParkerModel.js";


// Add a new Parking Location
export const addParking = async (req, res) => {
    try {
        const newParking = new Parking(req.body);
        await newParking.save();
        res.status(201).json({ success: true, message: "Parking location added successfully", parking: newParking });
    } catch (error) {
        console.error("Error adding parking location:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all Parking Locations
export const getAllParking = async (req, res) => {
    try {
        const parkings = await Parking.find()
        res.status(200).json({ success: true, parkings });
    } catch (error) {
        console.error("Error fetching parking locations:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Parking Location by ID
export const getParkingById = async (req, res) => {
    try {
        const parking = await Parking.findById(req.params.id);
        if (!parking) return res.status(404).json({ success: false, message: "Parking location not found" });

        res.status(200).json({ success: true, parking });
    } catch (error) {
        console.error("Error fetching parking by ID:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update Parking Location
export const updateParking = async (req, res) => {
    try {
        const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedParking) return res.status(404).json({ success: false, message: "Parking location not found" });

        res.status(200).json({ success: true, message: "Parking location updated successfully", parking: updatedParking });
    } catch (error) {
        console.error("Error updating parking location:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete Parking Location
export const deleteParking = async (req, res) => {
    try {
        const deletedParking = await Parking.findByIdAndDelete(req.params.id);
        if (!deletedParking) return res.status(404).json({ success: false, message: "Parking location not found" });

        res.status(200).json({ success: true, message: "Parking location deleted successfully" });
    } catch (error) {
        console.error("Error deleting parking location:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
