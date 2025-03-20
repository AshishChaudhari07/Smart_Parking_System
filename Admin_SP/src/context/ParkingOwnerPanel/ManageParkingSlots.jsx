import React, { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaParking } from "react-icons/fa";

const ManageParkingSlots = () => {
    // Example data (replace with real API data)
    const [parkingSlots, setParkingSlots] = useState([
        { id: 1, slotNumber: "A1", status: "Available" },
        { id: 2, slotNumber: "A2", status: "Booked" },
        { id: 3, slotNumber: "B1", status: "Reserved" },
        { id: 4, slotNumber: "B2", status: "Available" },
    ]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Manage Parking Slots</h2>
            <p className="text-gray-500">View and manage available parking slots.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-4">
                    <FaParking size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Slots</h3>
                        <p className="text-2xl">50</p>
                    </div>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-4">
                    <FaCheck size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Available Slots</h3>
                        <p className="text-2xl">20</p>
                    </div>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg flex items-center space-x-4">
                    <FaTimes size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Booked Slots</h3>
                        <p className="text-2xl">30</p>
                    </div>
                </div>
            </div>

            {/* Add Slot Button */}
            <div className="mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                    <FaPlus />
                    <span>Add New Slot</span>
                </button>
            </div>

            {/* Parking Slots Table */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Parking Slots</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-left">
                                <th className="p-3">Slot Number</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkingSlots.map((slot) => (
                                <tr key={slot.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{slot.slotNumber}</td>
                                    <td
                                        className={`p-3 font-semibold ${
                                            slot.status === "Available"
                                                ? "text-green-500"
                                                : slot.status === "Booked"
                                                ? "text-red-500"
                                                : "text-yellow-500"
                                        }`}
                                    >
                                        {slot.status}
                                    </td>
                                    <td className="p-3">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button className="text-red-500 hover:underline ml-4">Delete</button>
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
