import React from "react";
import { FaCar, FaUsers, FaDollarSign, FaClipboardList } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const OwnerReports = () => {
    const stats = {
        totalBookings: 125,
        totalRevenue: 56000,
        totalUsers: 50,
        totalSlots: 30,
    };

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
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            {/* Header */}
            <h2 className="text-4xl font-bold text-center tracking-wide drop-shadow-lg">📊 Parking Owner Reports</h2>
            <p className="text-center text-gray-300 mt-2">Comprehensive insights into your parking business.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
                {[
                    { title: "Total Bookings", value: stats.totalBookings, color: "bg-blue-500", icon: <FaClipboardList size={30} /> },
                    { title: "Total Revenue", value: `₹${stats.totalRevenue}`, color: "bg-green-500", icon: <FaDollarSign size={30} /> },
                    { title: "Total Users", value: stats.totalUsers, color: "bg-yellow-500", icon: <FaUsers size={30} /> },
                    { title: "Total Slots", value: stats.totalSlots, color: "bg-red-500", icon: <FaCar size={30} /> },
                ].map((card, index) => (
                    <div key={index} className={`p-6 ${card.color} text-white rounded-xl flex items-center space-x-4 shadow-lg transition-all transform hover:scale-105`}>
                        {card.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-2xl">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="mt-10 bg-gray-700 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4">📈 Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={revenueData}>
                        <XAxis dataKey="month" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Booking Statistics Chart */}
            <div className="mt-10 bg-gray-700 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4">📅 Weekly Booking Statistics</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={bookingData}>
                        <XAxis dataKey="day" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                        <Bar dataKey="bookings" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OwnerReports;
