import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaEye, FaUndo } from "react-icons/fa";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/payments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefund = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:3000/api/payments/${id}/refund`, 
                { status: "Refunded" }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
        <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 min-h-screen text-white">
            <div className="mb-6">
                <h1 className="text-4xl font-bold">Payments</h1>
                <p className="text-lg text-gray-200">Manage user transactions and refunds.</p>
            </div>

            <div className="flex bg-white rounded-lg shadow-lg p-3 mb-6">
                <FaSearch className="text-gray-500 ml-3" />
                <input 
                    type="text" 
                    placeholder="Search by user name..." 
                    className="w-full p-3 outline-none text-gray-700 bg-transparent"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl text-gray-800">
                <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

                {loading ? (
                    <p className="text-gray-600">Loading payments...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border p-3">User</th>
                                    <th className="border p-3">Amount ($)</th>
                                    <th className="border p-3">Payment Method</th>
                                    <th className="border p-3">Date</th>
                                    <th className="border p-3">Status</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments
                                    .filter(pay => pay.user.firstName.toLowerCase().includes(search.toLowerCase()))
                                    .map((pay, index) => (
                                        <tr 
                                            key={pay._id} 
                                            className={`text-center transition-all ${
                                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                            } hover:bg-gray-200`}
                                        >
                                            <td className="border p-3">{pay.user.firstName} {pay.user.lastName}</td>
                                            <td className="border p-3">${pay.amountPaid}</td>
                                            <td className="border p-3">{pay.method || "N/A"}</td>
                                            <td className="border p-3">{new Date(pay.date).toLocaleDateString()}</td>
                                            <td className="border p-3">
                                                <span className={`px-3 py-1 text-sm font-semibold rounded-lg shadow-md ${
                                                    pay.status === "Completed" ? "bg-green-500 text-white" :
                                                    pay.status === "Pending" ? "bg-yellow-500 text-white" :
                                                    pay.status === "Failed" ? "bg-red-500 text-white" :
                                                    "bg-blue-500 text-white"
                                                }`}>
                                                    {pay.status}
                                                </span>
                                            </td>
                                            <td className="border p-3 flex justify-center space-x-4">
                                                <button className="text-blue-500 hover:text-blue-700 transition-all">
                                                    <FaEye />
                                                </button>
                                                {pay.status === "Completed" && (
                                                    <button 
                                                        className="text-red-500 hover:text-red-700 transition-all"
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