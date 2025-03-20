import React from "react";
import { FaCar, FaMoneyBillWave, FaClipboardList, FaParking } from "react-icons/fa";

const OwnerDashboard = () => {
    // Example data (replace with real API data)
    const stats = [
        { title: "Total Bookings", value: "1,250", icon: <FaClipboardList />, color: "bg-blue-500" },
        { title: "Available Slots", value: "87", icon: <FaParking />, color: "bg-green-500" },
        { title: "Revenue", value: "$12,540", icon: <FaMoneyBillWave />, color: "bg-yellow-500" },
        { title: "Total Parking Slots", value: "300", icon: <FaCar />, color: "bg-red-500" },
    ];

    const recentBookings = [
        { id: 1, user: "John Doe", slot: "A12", date: "15 Mar 2025", amount: "$10" },
        { id: 2, user: "Alice Smith", slot: "B5", date: "14 Mar 2025", amount: "$8" },
        { id: 3, user: "Michael Brown", slot: "C7", date: "14 Mar 2025", amount: "$12" },
        { id: 4, user: "Emily Davis", slot: "D2", date: "13 Mar 2025", amount: "$9" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Owner Dashboard</h2>
            <p className="text-gray-500">Manage your parking business efficiently.</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl shadow-md text-white ${stat.color} flex items-center space-x-4`}
                    >
                        <div className="text-3xl">{stat.icon}</div>
                        <div>
                            <h3 className="text-xl font-semibold">{stat.value}</h3>
                            <p className="text-sm">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-left">
                                <th className="p-3">User</th>
                                <th className="p-3">Slot</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((booking) => (
                                <tr key={booking.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{booking.user}</td>
                                    <td className="p-3">{booking.slot}</td>
                                    <td className="p-3">{booking.date}</td>
                                    <td className="p-3 text-green-500">{booking.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Placeholder for Future Charts */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
                📊 Analytics & Charts will be displayed here (Integrate charts later).
            </div>
        </div>
    );
};

export default OwnerDashboard;
