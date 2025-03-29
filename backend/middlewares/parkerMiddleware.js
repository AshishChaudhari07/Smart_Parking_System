import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).json({ message: "Access Denied" });

        const verified = jwt.verify(token, "my_secret_key", { expiresIn: "240d" });
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware to verify Admin role
export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "Admin") {
            return res.status(403).json({ message: "Access Denied: Admins only" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Middleware to verify Parking Owner role
export const verifyParkingOwner = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "ParkingOwner") {
            return res.status(403).json({ message: "Access Denied: Parking Owners only" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
