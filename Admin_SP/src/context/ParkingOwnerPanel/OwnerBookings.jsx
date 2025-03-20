import React, { useState } from "react";
import { FaCheck, FaTimes, FaClock, FaFilter, FaSearch } from "react-icons/fa";

const OwnerBookings = () => {
    // Example data (Replace with real API data)
    const [bookings, setBookings] = useState([
        { id: 1, user: "John Doe", slot: "A1", date: "2025-03-16", status: "Confirmed" },
        { id: 2, user: "Jane Smith", slot: "B2", date: "2025-03-17", status: "Pending" },
        { id: 3, user: "Mike Johnson", slot: "C3", date: "2025-03-18", status: "Cancelled" },
    ]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Manage Bookings</h2>
            <p className="text-gray-500">View and manage parking slot bookings.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-4">
                    <FaClock size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Bookings</h3>
                        <p className="text-2xl">50</p>
                    </div>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-4">
                    <FaCheck size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Confirmed</h3>
                        <p className="text-2xl">30</p>
                    </div>
                </div>
                <div className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-4">
                    <FaClock size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Pending</h3>
                        <p className="text-2xl">15</p>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="mt-6 flex space-x-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search by user name..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                    <FaFilter />
                    <span>Filter</span>
                </button>
            </div>

            {/* Bookings Table */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-left">
                                <th className="p-3">User</th>
                                <th className="p-3">Slot</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{booking.user}</td>
                                    <td className="p-3">{booking.slot}</td>
                                    <td className="p-3">{booking.date}</td>
                                    <td
                                        className={`p-3 font-semibold ${
                                            booking.status === "Confirmed"
                                                ? "text-green-500"
                                                : booking.status === "Pending"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {booking.status}
                                    </td>
                                    <td className="p-3">
                                        {booking.status === "Pending" && (
                                            <button className="text-green-500 hover:underline mr-2">
                                                Approve
                                            </button>
                                        )}
                                        <button className="text-red-500 hover:underline">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OwnerBookings;
