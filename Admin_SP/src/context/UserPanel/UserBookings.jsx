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
      const response = await axios.get(`http://localhost:3000/api/reservation/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    allBooking();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">📅 My Bookings</h1>
        <p className="text-gray-600">Manage and track your parking bookings easily.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div key={booking._id} className="p-5 bg-white bg-opacity-90 shadow-lg rounded-xl backdrop-blur-lg transform transition-all hover:scale-105">
            <div className="flex items-center space-x-4 mb-3">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{booking.locationId?.locationName || "N/A"}</h3>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> {booking.date}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FaClock className="mr-2 text-gray-400" /> {booking.startTime} - {booking.endTime}
                </p>
                <p className="text-green-600 flex items-center font-semibold">
                  <FaDollarSign className="mr-1" /> ₹{booking.amountPaid}
                </p>
              </div>
            </div>

            <div className="text-right">
              {booking.status === "Upcoming" && (
                <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                  ⏳ {booking.status}
                </span>
              )}
              {booking.status === "Completed" && (
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md flex items-center justify-center">
                  <FaCheckCircle className="mr-1" /> {booking.status}
                </span>
              )}
              {booking.status === "Cancelled" && (
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md flex items-center justify-center">
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