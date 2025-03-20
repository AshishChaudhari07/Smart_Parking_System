import React from "react";
import { FaCar, FaUsers, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const OwnerReports = () => {
    // Example statistics (Replace with API data)
    const stats = {
        totalBookings: 125,
        totalRevenue: 56000,
        totalUsers: 50,
        totalSlots: 30,
    };

    // Example data for charts
    const revenueData = [
        { month: "Jan", revenue: 5000 },
        { month: "Feb", revenue: 7000 },
        { month: "Mar", revenue: 8000 },
        { month: "Apr", revenue: 6000 },
        { month: "May", revenue: 7500 },
        { month: "Jun", revenue: 9000 },
    ];

    const bookingData = [
        { day: "Mon", bookings: 15 },
        { day: "Tue", bookings: 22 },
        { day: "Wed", bookings: 18 },
        { day: "Thu", bookings: 25 },
        { day: "Fri", bookings: 20 },
        { day: "Sat", bookings: 30 },
        { day: "Sun", bookings: 28 },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Parking Owner Reports</h2>
            <p className="text-gray-500">Detailed analytics and reports for your parking business.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-4">
                    <FaClipboardList size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Bookings</h3>
                        <p className="text-2xl">{stats.totalBookings}</p>
                    </div>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-4">
                    <FaDollarSign size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Revenue</h3>
                        <p className="text-2xl">₹{stats.totalRevenue}</p>
                    </div>
                </div>
                <div className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-4">
                    <FaUsers size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-2xl">{stats.totalUsers}</p>
                    </div>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg flex items-center space-x-4">
                    <FaCar size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Slots</h3>
                        <p className="text-2xl">{stats.totalSlots}</p>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#e0e0e0" />
                        <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Booking Statistics Chart */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Booking Statistics</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={bookingData}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#e0e0e0" />
                        <Bar dataKey="bookings" fill="#3B82F6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OwnerReports;
