import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parkingSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSlot", required: true },
    parkingId: { type: mongoose.Schema.Types.ObjectId, ref: "Parking", required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Ensure this is present
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    amountPaid: { type: Number, default: 0 },
    securityAmountPaid: { type: Number, default: 0 }
  }); 
  

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;