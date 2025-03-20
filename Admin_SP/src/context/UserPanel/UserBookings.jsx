import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserBookings = () => {
  // Dummy data for bookings
  const bookings = [
    {
      id: 1,
      location: "City Center Parking",
      date: "March 20, 2025",
      time: "10:00 AM - 2:00 PM",
      price: "$10",
      status: "Upcoming",
    },
    {
      id: 2,
      location: "Downtown Garage",
      date: "March 12, 2025",
      time: "3:00 PM - 5:00 PM",
      price: "$6",
      status: "Completed",
    },
    {
      id: 3,
      location: "Mall Parking Zone",
      date: "March 10, 2025",
      time: "12:00 PM - 4:00 PM",
      price: "$8",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings 📅</h1>
        <p className="text-gray-600">Manage and track your parking bookings.</p>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{booking.location}</h3>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> {booking.date}
                </p>
                <p className="text-gray-500 flex items-center">
                  <FaClock className="mr-2 text-gray-400" /> {booking.time}
                </p>
                <p className="text-green-600 flex items-center font-semibold">
                  <FaDollarSign className="mr-1" /> {booking.price}
                </p>
              </div>
            </div>

            {/* Status Indicator */}
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
