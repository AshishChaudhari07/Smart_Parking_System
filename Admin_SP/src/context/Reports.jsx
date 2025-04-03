import React, { useEffect, useState } from "react";
import { FaChartBar, FaChartLine, FaUser, FaCar, FaMoneyBill, FaFileAlt } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Reports = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [parkingLocations, setParkingLocations] = useState(0);
    const [reservations, setReservations] = useState(0);

    // Fetch Dashboard Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No authentication token found");
                    return;
                }

                const usersRes = await axios.get("http://localhost:3000/api/user/all", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const locationsRes = await axios.get("http://localhost:3000/api/location/all");
                const reservationsRes = await axios.get("http://localhost:3000/api/reservation/all");

                setTotalUsers(usersRes.data.length);
                setParkingLocations(locationsRes.data.length);
                setReservations(reservationsRes.data.length);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
            }
        };

        fetchData();
    }, []);

    // Stats Cards
    const stats = [
        { id: 1, icon: <FaUser className="text-blue-500 text-3xl" />, title: "Total Users", count: totalUsers },
        { id: 2, icon: <FaCar className="text-green-500 text-3xl" />, title: "Parking Locations", count: parkingLocations },
        { id: 3, icon: <FaFileAlt className="text-yellow-500 text-3xl" />, title: "Reservations", count: reservations },
        { id: 4, icon: <FaMoneyBill className="text-purple-500 text-3xl" />, title: "Total Earnings", count: "$5,450" },
    ];

    // Sample Chart Data (Earnings & Reservations)
    const earningsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Earnings ($)",
                data: [500, 800, 1200, 950, 1300, 1700],
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(58, 123, 213, 0.6)");
                    gradient.addColorStop(1, "rgba(0, 210, 255, 0.3)");
                    return gradient;
                },
                borderColor: "rgba(58, 123, 213, 1)",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const reservationsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Reservations",
                data: [20, 35, 50, 40, 60, 80],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    // Recent System Logs
    const logs = [
        { id: 1, action: "Added new parking location", timestamp: "2025-03-14 10:30 AM" },
        { id: 2, action: "Approved refund request", timestamp: "2025-03-14 09:45 AM" },
        { id: 3, action: "Updated user role", timestamp: "2025-03-13 03:15 PM" },
        { id: 4, action: "Deleted inactive account", timestamp: "2025-03-13 12:20 PM" },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Reports & Logs</h1>
            <p className="text-lg text-gray-600">View analytics and system logs.</p>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div 
                        key={stat.id} 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform transition duration-300 hover:scale-105"
                    >
                        <div className="bg-white p-3 rounded-full shadow-md">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Earnings</h2>
                    <Bar data={earningsData} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservations Trend</h2>
                    <Line data={reservationsData} />
                </div>
            </div>

            {/* System Logs */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">Recent System Logs</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse overflow-hidden rounded-lg shadow-lg">
                        <thead className="bg-gray-700 text-white uppercase text-sm tracking-wide">
                            <tr>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300 bg-white">
                            {logs.map((log, index) => (
                                <tr 
                                    key={log.id} 
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                >
                                    <td className="px-6 py-3">{log.action}</td>
                                    <td className="px-6 py-3">{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;
