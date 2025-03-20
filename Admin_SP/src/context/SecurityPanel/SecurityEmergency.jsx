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
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-600" /> Emergency Assistance
            </h2>

            {/* Emergency Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
                    <FaPhoneAlt className="text-blue-600 text-5xl mb-3" />
                    <h3 className="text-xl font-semibold text-gray-700">Call Emergency Contacts</h3>
                    <p className="text-gray-500 text-sm mt-2">Quickly access important emergency numbers.</p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
                    <FaMapMarkerAlt className="text-green-600 text-5xl mb-3" />
                    <h3 className="text-xl font-semibold text-gray-700">Share Live Location</h3>
                    <p className="text-gray-500 text-sm mt-2">(Future Feature) Send your live location to authorities.</p>
                </div>
            </div>

            {/* Emergency Contacts List */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">Emergency Contacts</h3>
                </div>
                <ul className="divide-y">
                    {emergencyContacts.map((contact) => (
                        <li key={contact.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                            <span className="text-lg font-medium">{contact.name}</span>
                            <a href={`tel:${contact.number}`} className="text-blue-600 font-bold">
                                {contact.number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* SOS Button */}
            <div className="mt-6 flex justify-center">
                <button className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-red-700 transition">
                    🚨 Send SOS Alert
                </button>
            </div>
        </div>
    );
};

export default SecurityEmergency;
