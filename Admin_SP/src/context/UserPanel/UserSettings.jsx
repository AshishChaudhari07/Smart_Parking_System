import React, { useState, useEffect } from "react";
import { FaUserCircle, FaLock, FaBell, FaPalette, FaSignOutAlt } from "react-icons/fa";

const UserSettings = () => {
  const [user, setUser] = useState({ name: "User", email: "user@example.com" });

  // Fetch user data (if stored)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaUserCircle className="text-blue-500 mr-2" /> User Settings
        </h1>
        <p className="text-gray-600">Manage your account preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6 mb-6">
        <FaUserCircle className="text-gray-500 text-6xl" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {/* Change Password */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaLock className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
            <p className="text-gray-500">Update your password for security.</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaBell className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <p className="text-gray-500">Manage email & app notifications.</p>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <FaPalette className="text-purple-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Appearance</h3>
            <p className="text-gray-500">Customize theme & layout.</p>
          </div>
        </div>

        {/* Logout */}
        <button className="p-4 w-full bg-red-500 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
