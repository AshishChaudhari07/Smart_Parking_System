import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaEye, FaTimesCircle } from "react-icons/fa";

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/reservation/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:3000/api/reservation/${id}`, 
                { paymentStatus: "Canceled" }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReservations(reservations.map(res => 
                res._id === id ? { ...res, paymentStatus: "Canceled" } : res
            ));
        } catch (error) {
            console.error("Error canceling reservation:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 min-h-screen text-white">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold">Reservations</h1>
                <p className="text-lg text-gray-200">View and manage parking reservations.</p>
            </div>

            {/* Search Bar */}
            <div className="flex bg-white rounded-lg shadow-lg p-2 mb-6">
                <FaSearch className="text-gray-500 ml-3" />
                <input 
                    type="text" 
                    placeholder="Search by user name..." 
                    className="w-full p-3 outline-none text-gray-700 bg-transparent"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Reservation List */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-gray-800">
                <h2 className="text-2xl font-semibold mb-4">Reservation List</h2>

                {loading ? (
                    <p className="text-gray-600">Loading reservations...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border p-3">User</th>
                                    <th className="border p-3">Vehicle</th>
                                    <th className="border p-3">Slot</th>
                                    <th className="border p-3">Date</th>
                                    <th className="border p-3">Start Time</th>
                                    <th className="border p-3">End Time</th>
                                    <th className="border p-3">Status</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations
                                    .filter(res => res.userId?.firstName?.toLowerCase().includes(search.toLowerCase()))
                                    .map((res, index) => (
                                        <tr 
                                            key={res._id} 
                                            className={`text-center transition-all ${
                                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                            } hover:bg-gray-200`}
                                        >
                                            <td className="border p-3">{res.userId?.firstName} {res.userId?.lastName}</td>
                                            <td className="border p-3">{res.vehicleId?.vehicleType}</td>
                                            <td className="border p-3">{res.parkingSlotId?.parkingTag}</td>
                                            <td className="border p-3">{res.date}</td>
                                            <td className="border p-3">{res.startTime}</td>
                                            <td className="border p-3">{res.endTime}</td>
                                            <td className="border p-3">
                                                <span className={`px-3 py-1 text-sm font-semibold rounded-lg shadow-md ${
                                                    res.paymentStatus === "Confirmed" ? "bg-green-500 text-white" :
                                                    res.paymentStatus === "Pending" ? "bg-yellow-500 text-white" :
                                                    res.paymentStatus === "Completed" ? "bg-blue-500 text-white" :
                                                    "bg-red-500 text-white"
                                                }`}>
                                                    {res.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="border p-3 flex justify-center space-x-4">
                                                <button className="text-blue-500 hover:text-blue-700 transition-all">
                                                    <FaEye />
                                                </button>
                                                {res.paymentStatus !== "Canceled" && (
                                                    <button 
                                                        className="text-red-500 hover:text-red-700 transition-all"
                                                        onClick={() => handleCancel(res._id)}
                                                    >
                                                        <FaTimesCircle />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservations;
