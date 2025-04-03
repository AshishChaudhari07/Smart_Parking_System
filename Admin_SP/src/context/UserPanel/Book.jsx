import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Book = () => {
  const location = useLocation();
  const parkingSpot = location.state?.parkingSpot || null;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (parkingSpot) {
      setTotalPrice(parkingSpot.price * duration);
    }
  }, [duration, parkingSpot]);

  const handleBooking = async () => {
    if (!date || !time) {
      toast.error("Please select date and time.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      navigate("/login");
      return;
    }

    const bookingDetails = {
      locationId: parkingSpot.locationId,
      date,
      startTime: time,
      endTime: `${Number(time.split(":")[0]) + duration}:${time.split(":")[1]}`,
      amountPaid: totalPrice,
      paymentStatus: "Pending",
    };

    try {
      const response = await axios.post("http://localhost:3000/api/reservation/add", bookingDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking confirmed!");
      navigate("/user/bookings");
    } catch (error) {
      toast.error("Error booking. Please try again.");
    }
  };

  if (!parkingSpot) {
    return <div className="h-screen flex items-center justify-center text-xl text-red-600">No parking spot selected.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Confirm Your Booking</h1>
        <div className="flex items-center space-x-3 mb-4 border-b pb-2">
          <FaMapMarkerAlt className="text-red-500 text-2xl" />
          <div>
            <h2 className="text-lg font-semibold">{parkingSpot.city}, {parkingSpot.area}</h2>
            <p className="text-gray-500">₹{parkingSpot.price} per hour</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500 text-xl" />
            <input
              type="date"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <FaClock className="text-green-500 text-xl" />
            <input
              type="time"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-yellow-500 text-xl" />
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              {[1, 2, 3, 5, 10].map((hour) => (
                <option key={hour} value={hour}>{hour} Hour{hour > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="text-lg font-semibold text-green-600 text-center">
            Total Price: ₹{totalPrice}
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;