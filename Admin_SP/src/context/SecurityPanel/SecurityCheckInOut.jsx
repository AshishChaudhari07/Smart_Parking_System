import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SecurityCheckInOut = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [log, setLog] = useState([]);

    const handleToggleCheck = () => {
        const action = isCheckedIn ? "Checked Out" : "Checked In";
        const timestamp = new Date().toLocaleString();

        setIsCheckedIn(!isCheckedIn);
        setLog([{ action, timestamp }, ...log]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Card Container */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Security Check-In/Out</h2>

                {/* Status Display */}
                <div
                    className={`p-4 flex items-center justify-center text-white font-semibold text-lg rounded-lg transition duration-300 ${
                        isCheckedIn ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {isCheckedIn ? (
                        <>
                            <FaCheckCircle className="mr-2" size={20} />
                            Checked In
                        </>
                    ) : (
                        <>
                            <FaTimesCircle className="mr-2" size={20} />
                            Checked Out
                        </>
                    )}
                </div>

                {/* Check-In/Out Button */}
                <button
                    onClick={handleToggleCheck}
                    className={`mt-6 px-6 py-3 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 ${
                        isCheckedIn ? "bg-red-600 hover:bg-red-700 scale-105" : "bg-green-600 hover:bg-green-700 scale-105"
                    }`}
                >
                    {isCheckedIn ? "Check Out" : "Check In"}
                </button>

                {/* Activity Log */}
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Activity Log:</h3>
                    {log.length === 0 ? (
                        <p className="text-gray-500 italic">No records yet.</p>
                    ) : (
                        <ul className="text-gray-700 text-sm space-y-2">
                            {log.map((entry, index) => (
                                <li key={index} className="flex justify-between items-center border-b pb-2">
                                    <span className={entry.action === "Checked In" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                        {entry.action}
                                    </span>
                                    <span className="text-gray-500">{entry.timestamp}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityCheckInOut;
