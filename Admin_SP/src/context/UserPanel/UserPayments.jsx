import React from "react";
import { FaCreditCard, FaCalendarAlt, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserPayments = () => {
  // Dummy data for payment transactions
  const payments = [
    {
      id: 1,
      date: "March 14, 2025",
      amount: "$15",
      location: "City Center Parking",
      status: "Successful",
    },
    {
      id: 2,
      date: "March 10, 2025",
      amount: "$10",
      location: "Downtown Garage",
      status: "Failed",
    },
    {
      id: 3,
      date: "March 5, 2025",
      amount: "$20",
      location: "Mall Parking Zone",
      status: "Successful",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payment History 💳</h1>
        <p className="text-gray-600">View and track your parking payments.</p>
      </div>

      {/* Payment List */}
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{payment.location}</h3>
                <p className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" /> {payment.date}
                </p>
                <p className="text-green-600 flex items-center font-semibold">
                  <FaDollarSign className="mr-1" /> {payment.amount}
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex items-center space-x-4">
              {payment.status === "Successful" && (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md font-semibold flex items-center">
                  <FaCheckCircle className="mr-1" /> {payment.status}
                </span>
              )}
              {payment.status === "Failed" && (
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-md font-semibold flex items-center">
                  <FaTimesCircle className="mr-1" /> {payment.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPayments;
