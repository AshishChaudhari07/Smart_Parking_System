import mongoose from "mongoose";

const UserFavoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who favorited
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, // Favorited parking location
    createdAt: { type: Date, default: Date.now } // Timestamp of when it was added
});

const UserFavorite = mongoose.model('UserFavorite', UserFavoriteSchema);

export default UserFavorite;
 