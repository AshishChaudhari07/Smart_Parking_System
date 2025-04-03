import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaParking, FaCalendarCheck, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [allLocation, setAllLocatin] = useState(0);
    const [allReservation, setAllReservation] = useState(0);

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
    
            setStats(response.data);
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
            setAllReservation(res.data.length);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        getAllStates();
        getAllReservation();
    }, []);

    return (
        <div className="p-8 min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <h1 className="text-4xl font-extrabold text-center">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-center text-gray-200">Manage parking locations, users, and reservations efficiently.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <DashboardCard title="Total Users" value={stats.length || 0} icon={<FaUsers />} />
                <DashboardCard title="Parking Locations" value={allLocation || 0} icon={<FaParking />} />
                <DashboardCard title="Active Reservations" value={allReservation || 0} icon={<FaCalendarCheck />} />
                <DashboardCard title="Total Earnings" value={`$${stats.totalEarnings || 0}`} icon={<FaDollarSign />} />
            </div>

            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Recent Reservations</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                                <th className="border p-3">User</th>
                                <th className="border p-3">Gender</th>
                                <th className="border p-3">Contact</th>
                                <th className="border p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((res, index) => (
                                <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                    <td className="border p-3 text-gray-800">{res.firstName}</td>
                                    <td className="border p-3 text-gray-600">{res.gender}</td>
                                    <td className="border p-3 text-gray-600">{res.contactNum}</td>
                                    <td className="border p-3 text-gray-600">{new Date(res.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="text-4xl text-indigo-600">{icon}</div>
            <div>
                <p className="text-gray-600 text-lg">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
