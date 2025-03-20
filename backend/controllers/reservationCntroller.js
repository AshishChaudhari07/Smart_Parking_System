import Reservation from "../models/reservationModel.js";


// Book a parking slot
const createReservation = async (req, res) => {
    try {
        const { userId, parkingSlotId, parkingId, date, vehicleId, startTime, endTime, paymentStatus, amountPaid, securityAmountPaid } = req.body;
        const newReservation = new Reservation({ userId, parkingSlotId, parkingId, date, vehicleId, startTime, endTime, paymentStatus, amountPaid, securityAmountPaid });
        await newReservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};

const getAllReservation = async (req,res) => {
    try {
        const reservations = await Reservation.find().populate('userId').populate('parkingSlotId').populate('parkingId').populate('vehicleId');
        res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reservations', error });
            }
}

// Fetch user reservations
const getReservationsByUser = async (req, res) => {
    try {
        const reservations = await Reservation.findById(req.params.id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

// Retrieve reservation details
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservation', error });
    }
};

// Modify reservation timing
const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json({ message: 'Reservation updated successfully', reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reservation', error });
    }
};

// Cancel a reservation
const cancelReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling reservation', error });
    }
};

export {
    createReservation,
    getAllReservation,
    getReservationsByUser,
    getReservationById,
    updateReservation,
    cancelReservation
};
