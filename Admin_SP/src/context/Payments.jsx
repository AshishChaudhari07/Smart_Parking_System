import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaEye, FaUndo } from "react-icons/fa";

const Payments = () => {
    const [payments, setPayments] = useState([]); // Store fetched payments
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch payments from the backend
    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token"); // Ensure authentication
            const response = await axios.get("http://localhost:3000/api/payments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(response.data); // Set state with fetched payments
        } catch (error) {
            console.error("Error fetching payments:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Refund Request
    const handleRefund = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:3000/api/payments/${id}/refund`, 
                { status: "Refunded" }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update UI
            setPayments(payments.map(pay => 
                pay._id === id ? { ...pay, status: "Refunded" } : pay
            ));
        } catch (error) {
            console.error("Error processing refund:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
            </div>
            <p className="mt-2 text-gray-600">Manage user transactions and refunds.</p>

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
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>

                {loading ? (
                    <p className="text-gray-600">Loading payments...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="border p-2">User</th>
                                    <th className="border p-2">Amount ($)</th>
                                    <th className="border p-2">Payment Method</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments
                                    .filter(pay => pay.user.firstName.toLowerCase().includes(search.toLowerCase()))
                                    .map(pay => (
                                        <tr key={pay._id} className="text-center">
                                            <td className="border p-2">{pay.user.firstName} {pay.user.lastName}</td>
                                            <td className="border p-2">${pay.amountPaid}</td>
                                            <td className="border p-2">{pay.method || "N/A"}</td>
                                            <td className="border p-2">{new Date(pay.date).toLocaleDateString()}</td>
                                            <td className="border p-2">
                                                <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                                                    pay.status === "Completed" ? "bg-green-500 text-white" :
                                                    pay.status === "Pending" ? "bg-yellow-500 text-white" :
                                                    pay.status === "Failed" ? "bg-red-500 text-white" :
                                                    "bg-blue-500 text-white"
                                                }`}>
                                                    {pay.status}
                                                </span>
                                            </td>
                                            <td className="border p-2 flex justify-center space-x-4">
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    <FaEye />
                                                </button>
                                                {pay.status === "Completed" && (
                                                    <button 
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleRefund(pay._id)}
                                                    >
                                                        <FaUndo />
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

export default Payments;
