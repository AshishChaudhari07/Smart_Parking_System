import express from "express";
import UserFavorite from "../models/favoriteModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const routerFa = express.Router();

// Apply auth middleware to all routes
routerFa.use(authMiddleware);

/**
 * @route   GET /api/favorites
 * @desc    Get all favorite locations for the logged-in user
 * @access  Private (Requires Authentication)
 */
routerFa.get("/favorites", async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from token

    // Fetch all favorite locations of the user and populate the location details
    const favorites = await UserFavorite.find({ userId }).populate("locationId");

    res.status(200).json(favorites);
  } catch (error) { 
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
});

/**
 * @route   POST /api/favorites
 * @desc    Add a parking spot to user's favorites
 * @access  Private (Requires Authentication)
 */
routerFa.post("/favorites", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    console.log("User:", req.user);

    const userId = req.user.userId;
    const { locationId } = req.body;

    if (!locationId) {
      return res.status(400).json({ message: "locationId is required" });
    }

    // Check if already in favorites
    const existingFavorite = await UserFavorite.findOne({ userId, locationId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Location is already in favorites" });
    }

    // Add to favorites
    const newFavorite = new UserFavorite({ userId, locationId });
    await newFavorite.save();

    res.status(201).json({ message: "Added to favorites successfully", favorite: newFavorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Error adding favorite", error: error.message });
  }
});

/**
 * @route   DELETE /api/favorites/:id
 * @desc    Remove a parking spot from favorites
 * @access  Private (Requires Authentication)
 */
routerFa.delete("/favorites/:id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Find the favorite to ensure it belongs to the user
    const favorite = await UserFavorite.findOne({ _id: id, userId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found or unauthorized" });
    }

    // Remove favorite
    await UserFavorite.findByIdAndDelete(id);

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Error removing favorite", error: error.message });
  }
});

export default routerFa;
