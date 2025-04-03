import React, { useState, useEffect } from "react";
import { FaUserCircle, FaLock, FaBell, FaPalette, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const UserSettings = () => {
  const [user, setUser] = useState({ name: "User", email: "user@example.com" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FaUserCircle className="text-blue-600 dark:text-blue-800 mr-2" /> User Settings
        </h1>
        <p className="text-gray-800 dark:text-gray-500">Manage your account preferences.</p>
      </div>

      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center space-x-6 mb-6"
      >
        <FaUserCircle className="text-gray-700 dark:text-gray-300 text-6xl" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
        </div>
      </motion.div>

      {/* Settings Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <FaLock className="text-yellow-500 text-3xl" />, title: "Change Password", desc: "Update your password for security." },
          { icon: <FaBell className="text-green-500 text-3xl" />, title: "Notifications", desc: "Manage email & app notifications." },
          { icon: <FaPalette className="text-purple-500 text-3xl" />, title: "Appearance", desc: "Customize theme & layout." }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            whileHover={{ scale: 1.05 }} 
            className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center space-x-4 transition-all"
          >
            {item.icon}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-800 dark:text-gray-300">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="mt-6 p-4 w-full bg-red-500 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </motion.button>
    </div>
  );
};

export default UserSettings;
