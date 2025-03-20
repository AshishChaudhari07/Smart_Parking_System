import Parking from "../models/addParkerModel.js";
import Parker from "../models/parkerModel.js";
import ParkingSlot from "../models/parkingSlotModel.js";
import Reservation from "../models/reservationModel.js";
import mongoose from "mongoose";

// Add a new parker (entry into parking system)
const addParker = async (req, res) => {
    try {
        const { userId, vehicleId, parkingId, parkingSlotId, entryTime } = req.body;

        console.log("Received Parking ID:", parkingId); // Debugging line

        // Ensure ObjectId format
        if (!mongoose.Types.ObjectId.isValid(parkingId)) {
            return res.status(400).json({ success: false, message: "Invalid Parking ID" });
        }

        // Check if parking exists
        const parking = await Parking.findById(parkingId);
        if (!parking) {
            console.log("Parking location not found in DB");
            return res.status(404).json({ success: false, message: "Parking location not found" });
        }

        console.log("Parking found:", parking.title); // Debugging

        // Save Parker
        const newParker = new Parker({ userId, vehicleId, parkingId, parkingSlotId, entryTime, active: true });
        await newParker.save();

        res.status(201).json({ success: true, message: "Parker added successfully", newParker });
    } catch (error) {
        console.error("Error in addParker:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};


// Get all parkers
const getAllParkers = async (req, res) => {
    try {
        const parkers = await Reservation.find().populate("userId vehicleId parkingId parkingSlotId");
        res.json({success:true, parkers});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Get a specific parker by ID
const getParkerById = async (req, res) => {
    try {
        const parker = await Reservation.findById(req.params.id).populate("userId vehicleId parkingId parkingSlotId");
        if (!parker) return res.status(404).json({ message: "Parker not found" });
        res.json({success:true, parker});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Update parker details
const updateParker = async (req, res) => {
    try {
        const updatedParker = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedParker) return res.status(404).json({ message: "Parker not found" });
        res.json({success:true, updatedParker});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Checkout a parker
const checkoutParker = async (req, res) => {
    try {
        const { exitTime } = req.body;
        const parker = await Reservation.findById(req.params.id);
        if (!parker) return res.status(404).json({ message: "Parker not found" });
        
        const parking = await Parker.findById(parker.parkingId);
        if (!parking) return res.status(404).json({ message: "Parking location not found" });
        
        const fee = calculateParkingFee(parker.parkingId, parker.entryTime, exitTime, parker.vehicleType);
        
        parker.exitTime = exitTime;
        parker.amountPaid = fee;
        parker.active = false;
        await parker.save();

        await ParkingSlot.findByIdAndUpdate(parker.parkingSlotId, { active: true });
        res.json({success:true, message: "Parker checked out successfully", fee, parker });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Delete a parker (Admin Only)
const deleteParker = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.json({success:true, message: "Parker deleted successfully" });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

// Calculate parking fee
const calculateParkingFee = (parkingId, entryTime, exitTime, vehicleType) => {
    const duration = (new Date(exitTime) - new Date(entryTime)) / (1000 * 60 * 60); // Convert to hours
    const parkingRates = {
        "2 Wheeler": 10,
        "4 Wheeler": 20,
        "SUV": 30,
    };
    return Math.ceil(duration) * (parkingRates[vehicleType] || 0);
};

export { addParker, getAllParkers, getParkerById, updateParker, checkoutParker, deleteParker, calculateParkingFee };
