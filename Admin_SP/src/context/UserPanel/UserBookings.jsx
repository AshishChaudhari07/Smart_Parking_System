import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  const allBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser._id) {
        console.error("User ID is missing in localStorage!");
        return;
      }

      const userId = storedUser._id;
      console.log("User ID from localStorage:", userId);

      const response = await axios.get(`http://localhost:3000/api/reservation/user/${userId}`,  {
        headers: { Authorization: `Bearer ${token}` }, // Fixed missing "Bearer "
      });

      setBookings(response.data);
      console.log(response.data.locationId);
      console.log("Fetched bookings:", response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    allBooking();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings 📅</h1>
        <p className="text-gray-600">Manage and track your parking bookings.</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{booking.locationId?.locationName || "N/A"}</h3>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> {booking.date}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FaClock className="mr-2 text-gray-400" /> {booking.startTime} to {booking.endTime}
                </p>
                <p className="text-green-600 flex items-center font-semibold">
                  <FaDollarSign className="mr-1" /> {booking.amountPaid}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {booking.status === "Upcoming" && (
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md font-semibold">
                  ⏳ {booking.status}
                </span>
              )}
              {booking.status === "Completed" && (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md font-semibold flex items-center">
                  <FaCheckCircle className="mr-1" /> {booking.status}
                </span>
              )}
              {booking.status === "Cancelled" && (
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-md font-semibold flex items-center">
                  <FaTimesCircle className="mr-1" /> {booking.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
};

export default UserBookings;
