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
            console.log(response.data);
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Reservations</h1>
            </div>
            <p className="mt-2 text-gray-600">View and manage parking reservations.</p>

            <div className="mt-4 flex items-center bg-white p-2 rounded-lg shadow-md">
                <FaSearch className="text-gray-500 ml-2" />
                <input 
                    type="text" 
                    placeholder="Search by user name..." 
                    className="w-full p-2 outline-none" 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservation List</h2>

                {loading ? (
                    <p className="text-gray-600">Loading reservations...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="border p-2">User</th>
                                    <th className="border p-2">Vehicle</th>
                                    <th className="border p-2">Slot</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Start Time</th>
                                    <th className="border p-2">End Time</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations
                                    .filter(res => res.userId?.firstName?.toLowerCase().includes(search.toLowerCase()))
                                    .map(res => (
                                        <tr key={res._id} className="text-center">
                                            <td className="border p-2">{res.userId?.firstName} {res.userId?.lastName}</td>
                                            <td className="border p-2">{res.vehicleId?.vehicleType}</td>
                                            <td className="border p-2">{res.parkingSlotId?.parkingTag}</td>
                                            <td className="border p-2">{res.date}</td>
                                            <td className="border p-2">{res.startTime}</td>
                                            <td className="border p-2">{res.endTime}</td>
                                            <td className="border p-2">
                                                <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                                                    res.paymentStatus === "Confirmed" ? "bg-green-500 text-white" :
                                                    res.paymentStatus === "Pending" ? "bg-yellow-500 text-white" :
                                                    res.paymentStatus === "Completed" ? "bg-blue-500 text-white" :
                                                    "bg-red-500 text-white"
                                                }`}>
                                                    {res.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="border p-2 flex justify-center space-x-4">
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    <FaEye />
                                                </button>
                                                {res.paymentStatus !== "Canceled" && (
                                                    <button 
                                                        className="text-red-500 hover:text-red-700"
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
