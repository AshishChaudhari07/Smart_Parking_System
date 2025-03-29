import Reservation from "../models/reservationModel.js";

// Function to calculate end time based on duration
const calculateEndTime = (startTime, duration) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  let endHours = hours + Number(duration);
  if (endHours >= 24) endHours %= 24;
  return `${String(endHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Create a reservation
const createReservation = async (req, res) => {
  try {
    const { userId, parkingSlotId, parkingId, vehicleId, date, startTime, duration, locationId, amountPaid, securityAmountPaid } = req.body;

    if (!date || !startTime) {
      return res.status(400).json({ message: "Date and start time are required." });
    }

    console.log("Received Booking Data:", req.body); // Debugging line

    const formattedDate = new Date(date).toISOString();
    const endTime = calculateEndTime(startTime, duration);

    const reservation = new Reservation({
      userId,
      parkingSlotId,
      parkingId,
      vehicleId,
      locationId: locationId, // Ensuring locationId is properly set
      date: formattedDate,
      startTime,
      endTime,
      paymentStatus: "Pending",
      amountPaid: amountPaid || 0,
      securityAmountPaid: securityAmountPaid || 0
    });

    await reservation.save();
    res.status(201).json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error("Reservation Creation Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all reservations
const getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId", "firstName lastName email")
      .populate("locationId", "locationName")
      .populate("parkingId", "name")
      .populate("parkingSlotId", "slotNumber")
      .populate("vehicleId", "vehicleNumber");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// Get reservations by user
const getReservationsByUser = async (req, res) => {
  try {
    console.log("Fetching reservations for user:", req.params.id);
    const userId = req.params.id

    const reservations = await Reservation.find({ userId  })
      .populate("locationId")
      .populate("parkingSlotId", "slotNumber");

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found" });
    }
    console.log(reservations)
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation", error });
  }
};

// Update reservation
const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReservation) return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};

// Cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling reservation", error });
  }
};

export {
  createReservation,
  getAllReservation,
  getReservationsByUser,
  getReservationById,
  updateReservation,
  cancelReservation,
};
