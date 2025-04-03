import React from "react";
import { FaPhoneAlt, FaExclamationTriangle, FaMapMarkerAlt } from "react-icons/fa";

const SecurityEmergency = () => {
    // Sample Emergency Contacts
    const emergencyContacts = [
        { id: 1, name: "Police Station", number: "100" },
        { id: 2, name: "Fire Department", number: "101" },
        { id: 3, name: "Medical Emergency", number: "102" },
        { id: 4, name: "Security Supervisor", number: "+91 98765 43210" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 to-purple-700 p-6 flex flex-col items-center">
            {/* Page Title */}
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
                <FaExclamationTriangle className="mr-3 text-yellow-400" /> Emergency Assistance
            </h2>

            {/* Emergency Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full max-w-3xl">
                {[
                    { icon: <FaPhoneAlt className="text-blue-500 text-5xl" />, title: "Call Emergency Contacts", desc: "Quickly access important emergency numbers." },
                    { icon: <FaMapMarkerAlt className="text-green-500 text-5xl" />, title: "Share Live Location", desc: "(Future Feature) Send your live location to authorities." },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
                    >
                        {item.icon}
                        <h3 className="text-xl font-semibold text-gray-800 mt-3">{item.title}</h3>
                        <p className="text-gray-700 text-sm mt-2">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Emergency Contacts List */}
            <div className="w-full max-w-3xl bg-white bg-opacity-30 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="p-4 border-b border-gray-300 bg-white bg-opacity-20">
                    <h3 className="text-xl font-semibold text-gray-900">Emergency Contacts</h3>
                </div>
                <ul className="divide-y">
                    {emergencyContacts.map((contact, index) => (
                        <li
                            key={contact.id}
                            className="flex justify-between items-center p-4 transition-all duration-200 hover:bg-gray-200"
                        >
                            <span className="text-lg font-medium">{contact.name}</span>
                            <a href={`tel:${contact.number}`} className="text-blue-600 font-bold">
                                {contact.number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* SOS Button */}
            <div className="mt-8 flex justify-center">
                <button className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 animate-pulse">
                    🚨 Send SOS Alert
                </button>
            </div>
        </div>
    );
};

export default SecurityEmergency;
