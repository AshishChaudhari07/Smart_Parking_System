import express from "express";

import { verifyAdmin, verifyToken } from "../middlewares/parkerMiddleware.js";
import { addParker, checkoutParker, deleteParker, getAllParkers, getParkerById, updateParker } from "../controllers/addParker.js";


const routerParker = express.Router();

// Routes for Parker management
routerParker.post("/add", verifyToken, addParker);
routerParker.get("/all", verifyToken, getAllParkers);
routerParker.get("/:id", verifyToken, getParkerById);
routerParker.put("/update/:id", verifyToken, updateParker);
routerParker.post("/checkout/:id", verifyToken, checkoutParker);
routerParker.delete("/delete/:id", verifyAdmin, deleteParker);
routerParker.post("/calculate-fee", verifyToken, (req, res) => {
    const { parkingId, entryTime, exitTime, vehicleType } = req.body;
    const fee = calculateParkingFee(parkingId, entryTime, exitTime, vehicleType);
    res.json({ fee });
});

export default routerParker;
