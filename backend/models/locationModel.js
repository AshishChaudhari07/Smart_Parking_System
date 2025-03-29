import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    // locationId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    locationName: { type: String, required: true }
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;