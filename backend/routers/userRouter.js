import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers, uploadImage } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/addfile', uploadImage)

// Protected Routes (Require Authentication)
router.get("/get/:id", authMiddleware, getUserProfile);
router.post("/update/:id", authMiddleware, updateUserProfile);
router.delete("/delete/:id", deleteUser);

// Admin Route
router.get("/all", getAllUsers);

export default router;
