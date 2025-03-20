import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parkingSlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
    parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true },
    amountPaid: { type: Number, required: true },
    securityAmountPaid: { type: Number, default: 0 }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;