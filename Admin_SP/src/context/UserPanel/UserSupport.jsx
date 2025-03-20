import React from "react";
import { FaPhone, FaEnvelope, FaExclamationCircle, FaHeadset, FaQuestionCircle } from "react-icons/fa";

const UserSupport = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaHeadset className="text-blue-500 mr-2" /> Support & Help Center
        </h1>
        <p className="text-gray-600">How can we assist you today?</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQs */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaQuestionCircle className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">FAQs</h3>
            <p className="text-gray-500">Find answers to common questions.</p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaEnvelope className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contact Support</h3>
            <p className="text-gray-500">Email us at support@smartparking.com</p>
          </div>
        </div>

        {/* Report an Issue */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaExclamationCircle className="text-red-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Report an Issue</h3>
            <p className="text-gray-500">Facing problems? Let us know.</p>
          </div>
        </div>

        {/* Live Chat */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaPhone className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Live Chat</h3>
            <p className="text-gray-500">Get instant support from our team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSupport;
