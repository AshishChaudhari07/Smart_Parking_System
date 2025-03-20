import React, { useEffect, useState } from "react";
import { FaChartBar, FaChartLine, FaUser, FaCar, FaMoneyBill, FaFileAlt } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Reports = () => {

    const [states, setStates] = useState([]);
    const [allLocation, setAllLocatin] = useState([]);
    const [allReservation, setAllReservation] = useState([]);

    // Analytics Overview
    const stats = [
        { id: 1, icon: <FaUser className="text-blue-500 text-3xl" />, title: "Total Users", count: states },
        { id: 2, icon: <FaCar className="text-green-500 text-3xl" />, title: "Parking Locations", count: allLocation },
        { id: 3, icon: <FaFileAlt className="text-yellow-500 text-3xl" />, title: "Reservations", count: allReservation },
        { id: 4, icon: <FaMoneyBill className="text-purple-500 text-3xl" />, title: "Total Earnings", count: "$5,450" },
    ];

    // Sample Chart Data
    const earningsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Earnings ($)",
                data: [500, 800, 1200, 950, 1300, 1700],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
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
            },
        ],
    };

    // System Logs (Recent Admin Actions)
    const logs = [
        { id: 1, action: "Added new parking location", timestamp: "2025-03-14 10:30 AM" },
        { id: 2, action: "Approved refund request", timestamp: "2025-03-14 09:45 AM" },
        { id: 3, action: "Updated user role", timestamp: "2025-03-13 03:15 PM" },
        { id: 4, action: "Deleted inactive account", timestamp: "2025-03-13 12:20 PM" },
    ];

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            const response = await axios.get("http://localhost:3000/api/user/all", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStates(response.data.length);
        } catch (error) {
            console.error("Error fetching dashboard data:", error.response?.data || error.message);
        }
    };

    const getAllStates = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/location/all");
            setAllLocatin(res.data.length);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const getAllReservation = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/reservation/all");
            console.log(res.data.length);
            setAllReservation(res.data.length)
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    }


    useEffect(() => {
        fetchDashboardData();
        getAllStates();
        getAllReservation();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Reports & Logs</h1>
            <p className="mt-2 text-gray-600">View analytics and system logs.</p>

            {/* Analytics Overview */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        {stat.icon}
                        <div>
                            <p className="text-lg font-semibold">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800">Monthly Earnings</h2>
                    <Bar data={earningsData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800">Reservations Trend</h2>
                    <Line data={reservationsData} />
                </div>
            </div>

            {/* System Logs */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">Recent System Logs</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border p-2">Action</th>
                                <th className="border p-2">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id} className="text-center">
                                    <td className="border p-2">{log.action}</td>
                                    <td className="border p-2">{log.timestamp}</td>
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
