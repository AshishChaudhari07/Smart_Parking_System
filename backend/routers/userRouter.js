import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes (Require Authentication)
router.get("/get/:id", authMiddleware, getUserProfile);
router.put("/update/:id", authMiddleware, updateUserProfile);
router.delete("/delete/:id", deleteUser);

// Admin Route
router.get("/all", getAllUsers);

export default router;
