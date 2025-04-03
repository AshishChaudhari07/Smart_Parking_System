import React, { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaParking } from "react-icons/fa";

const ManageParkingSlots = () => {
    const [parkingSlots, setParkingSlots] = useState([
        { id: 1, slotNumber: "A1", status: "Available" },
        { id: 2, slotNumber: "A2", status: "Booked" },
        { id: 3, slotNumber: "B1", status: "Reserved" },
        { id: 4, slotNumber: "B2", status: "Available" },
    ]);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            {/* Header */}
            <h2 className="text-4xl font-bold text-center tracking-wide drop-shadow-lg">🚗 Manage Parking Slots</h2>
            <p className="text-center text-gray-300 mt-2">Easily manage and track available parking slots.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {[
                    { title: "Total Slots", value: 50, color: "bg-blue-500", icon: <FaParking size={30} /> },
                    { title: "Available Slots", value: 20, color: "bg-green-500", icon: <FaCheck size={30} /> },
                    { title: "Booked Slots", value: 30, color: "bg-red-500", icon: <FaTimes size={30} /> },
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

            {/* Add Slot Button */}
            <div className="flex justify-center mt-6">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                    <FaPlus />
                    <span className="text-lg font-semibold">Add New Slot</span>
                </button>
            </div>

            {/* Parking Slots Table */}
            <div className="mt-10 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">📍 Parking Slots</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white">
                        <thead className="bg-gray-800 bg-opacity-50 text-gray-300 text-lg uppercase">
                            <tr>
                                <th className="p-4 text-left">Slot Number</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {parkingSlots.map((slot) => (
                                <tr key={slot.id} className="border-b border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:bg-opacity-50 hover:shadow-lg">
                                    <td className="p-4 text-blue-600">{slot.slotNumber}</td>
                                    <td className={`p-4 font-semibold ${slot.status === "Available" ? "text-green-400" : slot.status === "Booked" ? "text-red-400" : "text-yellow-400"}`}>
                                        {slot.status}
                                    </td>
                                    <td className="p-4">
                                        <button className="text-blue-400 hover:underline transition-all">Edit</button>
                                        <button className="text-red-400 hover:underline ml-4 transition-all">Delete</button>
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

export default ManageParkingSlots;
