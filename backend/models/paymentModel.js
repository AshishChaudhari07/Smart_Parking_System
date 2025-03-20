import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amountPaid: { type: Number, required: true },
    method: { type: String, enum: ["Credit Card", "Debit Card", "PayPal", "UPI"], required: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed", "Refunded"], default: "Pending" },
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
