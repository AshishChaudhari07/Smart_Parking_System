import mongoose from "mongoose";

const ParkingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        address: { type: String, required: true },
        locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        totalCapacityTwoWheeler: { type: Number, required: true },
        totalCapacityFourWheeler: { type: Number, required: true },
        otherInformation: { type: String },
        active: { type: Boolean, default: true },
        HourlyChargeTwoWheeler: { type: Number, required: true },
        HourlyChargeFourWheeler: { type: Number, required: true },
        parkingType: { type: String, enum: ["Road", "Ground", "Building"], required: true },
        lat: { type: Number, required: true },
        log: { type: Number, required: true },
    },
    { timestamps: true }
);

const Parking = mongoose.model("Parking", ParkingSchema); 

export default Parking;
