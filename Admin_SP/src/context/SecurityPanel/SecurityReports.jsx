import React from "react";
import { FaFileAlt, FaCheckCircle, FaExclamationTriangle, FaDownload } from "react-icons/fa";

const SecurityReports = () => {
    // Sample Report Data
    const reports = [
        { id: 1, type: "Unauthorized Access", status: "Resolved", date: "2025-03-14" },
        { id: 2, type: "Parking Violation", status: "Pending", date: "2025-03-13" },
        { id: 3, type: "Security Breach", status: "Resolved", date: "2025-03-12" },
        { id: 4, type: "Suspicious Activity", status: "Pending", date: "2025-03-11" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-500 p-6 flex flex-col items-center">
            {/* Page Title */}
            <h2 className="text-4xl font-bold text-gray-700 mb-6 flex items-center drop-shadow-lg">
                <FaFileAlt className="mr-3 text-yellow-800" /> Security Reports
            </h2>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-full max-w-4xl">
                {[
                    { icon: <FaFileAlt className="text-blue-500 text-3xl" />, title: "Total Reports", value: 4 },
                    { icon: <FaCheckCircle className="text-green-500 text-3xl" />, title: "Resolved", value: 2 },
                    { icon: <FaExclamationTriangle className="text-red-500 text-3xl" />, title: "Pending", value: 2 },
                ].map((card, index) => (
                    <div
                        key={index}
                        className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-xl p-5 flex items-center transform transition-all duration-300 hover:scale-105"
                    >
                        {card.icon}
                        <div className="ml-3">
                            <h3 className="text-lg font-semibold text-gray-600">{card.title}</h3>
                            <p className="text-xl font-bold text-gray-500">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reports Table */}
            <div className="w-full max-w-4xl bg-white bg-opacity-30 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-300 bg-white bg-opacity-20">
                    <h3 className="text-xl font-semibold text-gray-900">Recent Reports</h3>
                    <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md shadow-md hover:scale-105 transition-transform">
                        <FaDownload className="mr-2" /> Download
                    </button>
                </div>

                {/* Table */}
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                            <th className="p-3">Report Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr
                                key={report.id}
                                className={`border-b transition-all duration-200 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } hover:bg-gray-200`}
                            >
                                <td className="p-3 font-medium">{report.type}</td>
                                <td className={`p-3 font-semibold ${report.status === "Resolved" ? "text-green-500" : "text-red-500"}`}>
                                    {report.status}
                                </td>
                                <td className="p-3">{report.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SecurityReports;
