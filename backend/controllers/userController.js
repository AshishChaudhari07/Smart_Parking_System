
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, gender, contactNum, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser){
             return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, gender, contactNum, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ success:true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id, role: user.role }, "my_secret_key", { expiresIn: "24h" });
        res.json({
             success:true,
             token, 
             user
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true, select: "-password" });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from route params

        // Validate if ID is provided and is a valid MongoDB ObjectId
        if (!id || id.length !== 24) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, getAllUsers };
