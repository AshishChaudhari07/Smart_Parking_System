import Payment from "../models/paymentModel.js";


const getAllPayment = async (req,res) => {
    try {
        const payments = await Payment.find().populate("user", "firstName lastName");
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error });
    }
}

const proocessRefund = async (req,res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, { status: "Refunded" }, { new: true });
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error processing refund", error });
    }
}

export { getAllPayment, proocessRefund };