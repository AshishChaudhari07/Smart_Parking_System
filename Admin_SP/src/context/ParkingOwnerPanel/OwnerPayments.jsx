import React, { useState } from "react";
import { FaMoneyBill, FaCheck, FaTimes, FaClock, FaSearch, FaFilter } from "react-icons/fa";

const OwnerPayments = () => {
    // Example payment data (Replace with real API data)
    const [payments, setPayments] = useState([
        { id: 1, user: "John Doe", amount: "$50", date: "2025-03-16", method: "Credit Card", status: "Completed" },
        { id: 2, user: "Jane Smith", amount: "$30", date: "2025-03-17", method: "PayPal", status: "Pending" },
        { id: 3, user: "Mike Johnson", amount: "$40", date: "2025-03-18", method: "UPI", status: "Failed" },
    ]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Manage Payments</h2>
            <p className="text-gray-500">View and track parking payments.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-4">
                    <FaMoneyBill size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Revenue</h3>
                        <p className="text-2xl">$5,000</p>
                    </div>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-4">
                    <FaCheck size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Completed Payments</h3>
                        <p className="text-2xl">$4,500</p>
                    </div>
                </div>
                <div className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-4">
                    <FaClock size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Pending Payments</h3>
                        <p className="text-2xl">$500</p>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="mt-6 flex space-x-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search by user name..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                    <FaFilter />
                    <span>Filter</span>
                </button>
            </div>

            {/* Payments Table */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-left">
                                <th className="p-3">User</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Method</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{payment.user}</td>
                                    <td className="p-3">{payment.amount}</td>
                                    <td className="p-3">{payment.date}</td>
                                    <td className="p-3">{payment.method}</td>
                                    <td
                                        className={`p-3 font-semibold ${
                                            payment.status === "Completed"
                                                ? "text-green-500"
                                                : payment.status === "Pending"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {payment.status}
                                    </td>
                                    <td className="p-3">
                                        {payment.status === "Pending" && (
                                            <button className="text-green-500 hover:underline mr-2">
                                                Mark as Paid
                                            </button>
                                        )}
                                        <button className="text-red-500 hover:underline">
                                            Refund
                                        </button>
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
