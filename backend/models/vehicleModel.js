import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registrationNum: { type: String, required: true, unique: true },
    vehicleType: { type: String, enum: ['4 Wheeler', '2 Wheeler', 'SUV'], required: true }
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;