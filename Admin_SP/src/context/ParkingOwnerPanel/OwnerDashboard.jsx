import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCar, FaMoneyBillWave, FaClipboardList, FaParking } from "react-icons/fa";

const OwnerDashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);

    // Fetch dashboard data from the backend
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/user/all");
                const data = response.data;
                setRecentBookings(data);

                // Set the stats dynamically
                setStats([
                    { title: "Total Bookings", value: data.length, icon: <FaClipboardList />, color: "bg-blue-600" },
                    { title: "Available Slots", value: data.availableSlots || "87", icon: <FaParking />, color: "bg-green-600" },
                    { title: "Revenue", value: "$12,540", icon: <FaMoneyBillWave />, color: "bg-yellow-500" },
                    { title: "Total Parking Slots", value: data.totalSlots || "100", icon: <FaCar />, color: "bg-red-500" },
                ]);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
            {/* Header */}
            <h2 className="text-4xl font-bold">Owner Dashboard</h2>
            <p className="text-lg text-gray-200">Manage your parking business efficiently.</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl shadow-lg text-white ${stat.color} flex items-center space-x-4 transition transform hover:scale-105 bg-opacity-90 backdrop-blur-md`}
                    >
                        <div className="text-4xl">{stat.icon}</div>
                        <div>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <p className="text-sm">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="mt-8 bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-xl p-6">
                {/* Section Title */}
                <h3 className="text-3xl font-bold text-gray-700 mb-5 tracking-wide drop-shadow-md">Recent Bookings</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white shadow-xl rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <thead className="bg-black bg-opacity-50 backdrop-blur-xl text-gray-200 text-lg uppercase tracking-wider">
                            <tr>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Amount</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-gray-800 bg-opacity-40 backdrop-blur-md text-white">
                            {recentBookings?.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-5 text-center text-gray-300 text-lg">No bookings available</td>
                                </tr>
                            ) : (
                                recentBookings?.map((booking, index) => (
                                    <tr
                                        key={booking.id}
                                        className={`border-b border-gray-700 transition-all duration-300 
                            ${index % 2 === 0 ? "bg-gray-900 bg-opacity-30" : "bg-gray-800 bg-opacity-20"} 
                            hover:bg-gray-700 hover:bg-opacity-50 hover:shadow-lg hover:scale-[1.02]`}
                                    >
                                        <td className="p-5 text-lg font-medium">{booking.firstName || "N/A"}</td>
                                        <td className="p-5 text-gray-300">{booking.email || "N/A"}</td>
                                        <td className="p-5">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}</td>
                                        <td className="p-5 text-green-400 font-semibold">${booking.securityAmount || "0.00"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Placeholder for Future Charts */}
            <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 text-center text-gray-700">
                📊 Analytics & Charts will be displayed here (Integrate charts later).
            </div>
        </div>
    );
};

export default OwnerDashboard;
