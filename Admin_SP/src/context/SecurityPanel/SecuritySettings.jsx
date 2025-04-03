import React, { useState } from "react";
import { FaUserShield, FaLock, FaBell, FaMoon, FaSun } from "react-icons/fa";

const SecuritySettings = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} p-6`}>
            <h2 className="text-3xl font-bold flex items-center mb-6">
                <FaUserShield className="mr-2 text-blue-600" /> Security Settings
            </h2>

            {/* Settings Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Settings */}
                <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Update your profile information and password.</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-md shadow hover:bg-blue-700">
                        Manage Profile
                    </button>
                </div>

                {/* Notification Settings */}
                <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaBell className="mr-2 text-yellow-500" /> Notifications
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Enable or disable security alerts.</p>
                    <div className="mt-4 flex items-center">
                        <label className="relative inline-flex cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                                className="sr-only"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all after:content-[''] checked:after:translate-x-5 checked:bg-green-500"></div>
                        </label>
                        <span className="ml-3 text-sm">{notifications ? "Enabled" : "Disabled"}</span>
                    </div>
                </div>

                {/* Dark Mode Toggle */}
                <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        {darkMode ? <FaSun className="mr-2 text-yellow-400" /> : <FaMoon className="mr-2 text-gray-700" />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </h3>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`mt-4 px-4 py-2 font-bold rounded-md shadow transition ${
                            darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"
                        }`}
                    >
                        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                </div>

                {/* Security Preferences */}
                <div className="bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FaLock className="mr-2 text-red-500" /> Security Preferences
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Manage security access and account lock settings.</p>
                    <button className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow hover:bg-red-700">
                        Manage Security
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
