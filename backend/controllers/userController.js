
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { uploadFileToCloudinary } from '../utils/CloudanryUtil.js'
import path from 'path';

const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb) => {
        cb(null, file.originalname)
        }
})

const upload = multer({
    storage:storage,
}).single('image')

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

        const token = jwt.sign({ userId: user._id, role: user.role }, "my_secret_key", { expiresIn: "240d" });
        res.json({
             success:true,
             token, 
             user
             });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadImage = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        // database data store
        //cloundinary
  
        const cloundinaryResponse = await uploadFileToCloudinary(req.file);
        console.log(cloundinaryResponse);
        console.log(req.body);
  
        //store data in database
        req.body.hordingURL = cloundinaryResponse.secure_url;
        const savedUser = await User.create(req.body);
  
        res.status(200).json({
          message: "hording saved successfully",
          data: savedUser,
        });
      }
    });
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

export { registerUser, loginUser, uploadImage, getUserProfile, updateUserProfile, deleteUser, getAllUsers };
