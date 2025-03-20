import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaMoon, FaSun, FaCheckCircle } from "react-icons/fa";

const Settings = () => {
    // State for theme toggle and notifications
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h2 className="text-4xl font-bold text-center mb-6">⚙️ Settings</h2>
            <p className="text-gray-500 text-center mb-8">Manage your account, preferences, and security</p>

            <div className="max-w-3xl mx-auto space-y-8">

                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transition-all">
                    <h3 className="text-xl font-semibold flex items-center">
                        <FaUser className="mr-2 text-blue-500" /> Profile Settings
                    </h3>
                    <div className="mt-4 space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white" />
                        <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white" />
                        <input type="text" placeholder="Contact Number" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white" />
                        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="mr-2" /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transition-all">
                    <h3 className="text-xl font-semibold flex items-center">
                        <FaLock className="mr-2 text-red-500" /> Security
                    </h3>
                    <div className="mt-4 space-y-4">
                        <input type="password" placeholder="New Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white" />
                        <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white" />
                        <button className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                            <FaCheckCircle className="mr-2" /> Update Password
                        </button>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transition-all flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center">
                        <FaBell className="mr-2 text-yellow-500" /> Notifications
                    </h3>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        <div className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-all ${notifications ? "bg-green-500" : ""}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${notifications ? "translate-x-6" : ""}`}></div>
                        </div>
                    </label>
                </div>

                {/* Theme Toggle */}
                <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transition-all flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center">
                        {darkMode ? <FaMoon className="mr-2 text-purple-500" /> : <FaSun className="mr-2 text-yellow-500" />} Theme
                    </h3>
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 transition-all"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "🌙 Switch to Light Mode" : "☀️ Switch to Dark Mode"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
