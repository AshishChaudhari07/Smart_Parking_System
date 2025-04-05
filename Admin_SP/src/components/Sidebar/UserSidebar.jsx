import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
    FaHome, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, 
    FaStar, FaCog, FaSignOutAlt, FaBars, FaTimes, FaQuestionCircle, FaUserCircle
} from "react-icons/fa";

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [userName, setUserName] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // Fetch user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserName(userData.firstName || "User");
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
        { name: "Dashboard", icon: <FaHome />, path: "/user/dashboard" },
        { name: "Find Parking", icon: <FaMapMarkerAlt />, path: "/user/find-parking" },
        { name: "My Bookings", icon: <FaCalendarAlt />, path: "/user/bookings" },
        { name: "Payments", icon: <FaCreditCard />, path: "/user/payments" },
        { name: "Favorites", icon: <FaStar />, path: "/user/favorites" },
        { name: "Support & Help", icon: <FaQuestionCircle />, path: "/user/support" },
        { name: "Settings", icon: <FaCog />, path: "/user/settings" },
    ];

    return (
        <>
            {/* Close Button Positioned Outside Sidebar */}
            <button onClick={() => setIsOpen(!isOpen)} 
                className="fixed top-4 left-4 text-white bg-gray-900 p-2 rounded-full 
                shadow-md hover:bg-gray-800 transition lg:hidden">
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            {/* Sidebar Container */}
            <div className={`fixed top-0 left-0 h-full bg-gray-900 bg-opacity-90 backdrop-blur-lg 
                text-white shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col p-3`}>

                {/* User Profile Section (Single Line) */}
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
                    <div className="flex items-center">
                        <FaUserCircle size={36} className="text-blue-400" />
                        {isOpen && <span className="ml-3 text-lg font-semibold">{userName}</span>}
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex flex-col mt-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.path}
                            className={`flex items-center p-3 rounded-lg text-gray-300 transition ${
                                location.pathname === item.path 
                                    ? "bg-blue-600 text-white shadow-md" 
                                    : "hover:bg-gray-700 hover:text-white"
                            }`}>
                            <span className="text-xl">{item.icon}</span>
                            {isOpen && <span className="ml-3">{item.name}</span>}
                        </Link>
                    ))}

                    {/* Logout Button */}
                    <button onClick={handleLogout}
                        className="flex items-center p-3 w-full text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition">
                        <FaSignOutAlt size={20} />
                        {isOpen && <span className="ml-3">Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Overlay for mobile screens */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
};

export default UserSidebar;
