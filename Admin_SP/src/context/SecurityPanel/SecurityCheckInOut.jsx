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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-500 p-6">
            {/* Glassmorphism Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-700 drop-shadow-lg mb-6">Security Check-In/Out</h2>

                {/* Status Display */}
                <div
                    className={`p-4 flex items-center justify-center font-semibold text-lg rounded-lg transition duration-300 shadow-md ${
                        isCheckedIn ? "bg-green-500 text-white" : "bg-red-500 text-white"
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
                    className={`mt-6 px-6 py-3 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 ${
                        isCheckedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {isCheckedIn ? "Check Out" : "Check In"}
                </button>

                {/* Activity Log */}
                <div className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-inner max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-white mb-2">Activity Log:</h3>
                    {log.length === 0 ? (
                        <p className="text-gray-600 italic">No records yet.</p>
                    ) : (
                        <ul className="text-white text-sm space-y-2">
                            {log.map((entry, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-gray-300 pb-2">
                                    <span className={entry.action === "Checked In" ? "text-green-300 font-semibold" : "text-red-300 font-semibold"}>
                                        {entry.action}
                                    </span>
                                    <span className="text-gray-200">{entry.timestamp}</span>
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
