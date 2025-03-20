import express from "express";
import { addParking, getAllParking, getParkingById, updateParking, deleteParking } from "../controllers/parkingController.js";

const parkingRouter = express.Router();

parkingRouter.post("/add", addParking);
parkingRouter.get("/all", getAllParking);
parkingRouter.get("/:id", getParkingById);
parkingRouter.put("/:id", updateParking);
parkingRouter.delete("/:id", deleteParking);

export default parkingRouter;
