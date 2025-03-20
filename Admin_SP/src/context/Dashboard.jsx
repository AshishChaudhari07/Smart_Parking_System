import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaParking, FaCalendarCheck, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [allLocation, setAllLocatin] = useState([]);
    const [allReservation, setAllReservation] = useState([]);


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
    
            console.log(response.data);
            console.log(response.data[0].firstName);
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
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage parking locations, users, and reservations efficiently.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <DashboardCard title="Total Users" value={stats.length || 0} icon={<FaUsers />} />
                <DashboardCard title="Parking Locations" value={allLocation || 0} icon={<FaParking />} />
                <DashboardCard title="Active Reservations" value={allReservation || 0} icon={<FaCalendarCheck />} />
                <DashboardCard title="Total Earnings" value={`$${stats.totalEarnings || 0}`} icon={<FaDollarSign />} />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">Recent Reservations</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">User</th>
                                <th className="border p-2">Gender</th>
                                <th className="border p-2">contactNum</th>
                                <th className="border p-2">Date</th>
                                {/* <th className="border p-2">Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((res, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{res.firstName}</td>
                                    <td className="border p-2">{res.gender}</td>
                                    <td className="border p-2">{res.contactNum}</td>
                                    <td className="border p-2">{res.createdAt}</td>
                                    {/* <td className={`border p-2 font-semibold ${res.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                                        {res.status}
                                    </td> */}
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
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="text-3xl text-blue-500">{icon}</div>
            <div>
                <p className="text-gray-600">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
