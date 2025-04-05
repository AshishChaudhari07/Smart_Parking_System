import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaUserShield, FaClipboardCheck, FaEye, FaFileAlt,
    FaPhoneAlt, FaCog, FaSignOutAlt, FaBars
} from "react-icons/fa";

const SecuritySidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [securityName, setSecurityName] = useState("Security");
    const location = useLocation();
    const navigate = useNavigate();

    // Fetch security guard data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("security");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setSecurityName(userData.firstName || "Security");
        }
    }, []);

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/home");
        window.location.reload();
    };

    // Sidebar Menu Items
    const menuItems = [
        { name: "Check-In/Out", icon: <FaClipboardCheck />, path: "/security/checkin-out" },
        { name: "Live Monitoring", icon: <FaEye />, path: "/security/live-monitoring" },
        { name: "Reports & Logs", icon: <FaFileAlt />, path: "/security/reports" },
        { name: "Emergency Contact", icon: <FaPhoneAlt />, path: "/security/emergency" },
        { name: "Settings", icon: <FaCog />, path: "/security/settings" },
    ];

    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-xl backdrop-blur-lg bg-opacity-90 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col`}>
            
            {/* Sidebar Toggle Button */}
            <div className="p-4 flex justify-between items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none transition-transform transform hover:scale-110">
                    <FaBars size={24} />
                </button>
            </div>

            {/* Security Profile */}
            <div className="flex items-center p-4 space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {securityName.charAt(0).toUpperCase()}
                </div>
                {isOpen && <p className="text-lg font-semibold">{securityName}</p>}
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col mt-4 space-y-2 px-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center p-3 rounded-lg transition-all text-white ${location.pathname === item.path ? "bg-blue-600 shadow-md" : "hover:bg-gray-800 hover:shadow-md"}`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {isOpen && <span className="ml-4 text-md">{item.name}</span>}
                    </Link>
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center p-3 w-full text-red-400 hover:bg-gray-800 rounded-lg transition-all hover:shadow-md"
                >
                    <FaSignOutAlt size={20} />
                    {isOpen && <span className="ml-4">Logout</span>}
                </button>
            </nav>
        </div>
    );
};

export default SecuritySidebar;
