import mongoose from "mongoose";

const ParkingSlotSchema = new mongoose.Schema({
    parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking', required: true },
    floor: { type: String, required: true },
    parkingTag: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    minimumParkingMinutes: { type: Number, required: true },
    suvSupported: { type: Boolean, default: false }
});

const ParkingSlot = mongoose.model('ParkingSlot', ParkingSlotSchema);

export default ParkingSlot;