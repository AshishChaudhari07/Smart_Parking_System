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
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFileAlt className="mr-2 text-blue-600" /> Security Reports
            </h2>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
                    <FaFileAlt className="text-blue-500 text-3xl mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Reports</h3>
                        <p className="text-xl font-bold">4</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
                    <FaCheckCircle className="text-green-500 text-3xl mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Resolved</h3>
                        <p className="text-xl font-bold">2</p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
                    <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
                        <p className="text-xl font-bold">2</p>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Recent Reports</h3>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                        <FaDownload className="mr-2" /> Download
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                            <th className="p-3">Report Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b">
                                <td className="p-3">{report.type}</td>
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
