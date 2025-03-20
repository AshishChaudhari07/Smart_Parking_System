import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut, FiX, FiGrid, FiUsers, FiMapPin, FiCalendar, FiDollarSign, FiFileText } from "react-icons/fi";

const AdminSidebar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    const SidebarData = [
        { title: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
        { title: "Manage Users", path: "/admin/manage-users", icon: <FiUsers /> },
        { title: "Parking Locations", path: "/admin/parking-locations", icon: <FiMapPin /> },
        { title: "Reservations", path: "/admin/reservations", icon: <FiCalendar /> },
        { title: "Payments", path: "/admin/payments", icon: <FiDollarSign /> },
        { title: "Reports & Logs", path: "/admin/reports", icon: <FiFileText /> },
    ];

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 absolute top-4 left-4 z-50 bg-gray-900 text-white rounded-md"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar Container */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-xl w-72 p-5 flex flex-col 
                transition-transform duration-300 backdrop-blur-lg bg-opacity-80 rounded-r-xl ${
                    isOpen ? "translate-x-0" : "-translate-x-72"
                } lg:translate-x-0`}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Admin Panel</h2>

                {/* Navigation Menu */}
                <nav className="flex flex-col space-y-3">
                    {SidebarData.map((item, index) => (
                        <button
                            key={index}
                            className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg transition duration-200"
                            onClick={() => navigate(item.path)}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-lg">{item.title}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center mt-auto p-3 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition"
                    >
                        <FiLogOut className="text-xl" />
                        <span className="ml-3">Logout</span>
                    </button>
                )}
            </div>

            {/* Overlay for Mobile View */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
};

export default AdminSidebar;
