import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    image:{type:String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    contactNum: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Security', 'User', 'ParkingOwner'], default:'User', required: true },
    otp: { type: String },
    securityAmount: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;