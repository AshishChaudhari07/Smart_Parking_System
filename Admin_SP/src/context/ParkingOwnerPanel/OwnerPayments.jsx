import React, { useState } from "react";
import { FaMoneyBill, FaCheck, FaTimes, FaClock, FaSearch, FaFilter } from "react-icons/fa";

const OwnerPayments = () => {
    const [payments, setPayments] = useState([
        { id: 1, user: "John Doe", amount: "$50", date: "2025-03-16", method: "Credit Card", status: "Completed" },
        { id: 2, user: "Jane Smith", amount: "$30", date: "2025-03-17", method: "PayPal", status: "Pending" },
        { id: 3, user: "Mike Johnson", amount: "$40", date: "2025-03-18", method: "UPI", status: "Failed" },
    ]);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            {/* Header */}
            <h2 className="text-4xl font-bold text-center tracking-wide drop-shadow-lg">💳 Manage Payments</h2>
            <p className="text-center text-gray-300 mt-2">Track and manage all parking payments efficiently.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {[
                    { title: "Total Revenue", value: "$5,000", color: "bg-blue-500", icon: <FaMoneyBill size={30} /> },
                    { title: "Completed Payments", value: "$4,500", color: "bg-green-500", icon: <FaCheck size={30} /> },
                    { title: "Pending Payments", value: "$500", color: "bg-yellow-500", icon: <FaClock size={30} /> },
                ].map((card, index) => (
                    <div key={index} className={`p-6 ${card.color} text-white rounded-lg flex items-center space-x-4 shadow-lg transition-all transform hover:scale-105`}>
                        {card.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-2xl">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-2/3">
                    <input
                        type="text"
                        placeholder="🔍 Search by user name..."
                        className="w-full p-3 pl-12 border border-gray-500 bg-gray-800 text-white rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                    <FaFilter />
                    <span>Filter</span>
                </button>
            </div>

            {/* Payments Table */}
            <div className="mt-10 bg-gray-600 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4">📌 Payment Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white">
                        <thead className="bg-gray-800 bg-opacity-50 text-gray-300 text-lg uppercase">
                            <tr>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Method</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:bg-opacity-50 hover:shadow-lg">
                                    <td className="p-4">{payment.user}</td>
                                    <td className="p-4">{payment.amount}</td>
                                    <td className="p-4">{payment.date}</td>
                                    <td className="p-4">{payment.method}</td>
                                    <td className={`p-4 font-semibold ${payment.status === "Completed" ? "text-green-400" : payment.status === "Pending" ? "text-yellow-400" : "text-red-400"}`}>
                                        {payment.status}
                                    </td>
                                    <td className="p-4 flex space-x-4">
                                        {payment.status === "Pending" && (
                                            <button className="text-green-400 hover:underline transition-all">✔ Mark as Paid</button>
                                        )}
                                        <button className="text-red-400 hover:underline transition-all">✖ Refund</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OwnerPayments;
