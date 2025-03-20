import mongoose from "mongoose";

const ParkerSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
        parkingId: { type: mongoose.Schema.Types.ObjectId, ref: "Parking", required: true },
        parkingSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSlot", required: true },
        entryTime: { type: Date, required: true },
        exitTime: { type: Date },
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const Parker = mongoose.model("Parker", ParkerSchema);

export default Parker;
