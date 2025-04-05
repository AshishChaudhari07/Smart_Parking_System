import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';

import Dashboard from "./context/Dashboard";
import ManageUsers from "./context/ManageUsers";
import ParkingLocations from "./context/ParkingLocations";
import Reservations from "./context/Reservations";
import Payments from "./context/Payments";
import Reports from "./context/Reports";
import Login from "./context/Login";
import Signup from "./context/Signup";
import PrivateRoute from "./pagesAuth/PrivateRoute";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import OwnerDashboard from "./context/ParkingOwnerPanel/OwnerDashboard";
import ManageParkingSlots from "./context/ParkingOwnerPanel/ManageParkingSlots";
import OwnerBookings from "./context/ParkingOwnerPanel/OwnerBookings";
import OwnerPayments from "./context/ParkingOwnerPanel/OwnerPayments";
import OwnerReports from "./context/ParkingOwnerPanel/OwnerReports";
import ParkingOwnerSidebar from "./components/Sidebar/ParkingOwnerSidebar";
import Settings from "./context/ParkingOwnerPanel/Settings";
import Users from "./context/ParkingOwnerPanel/Users";
import UserSidebar from "./components/Sidebar/UserSidebar";
import UserSettings from "./context/UserPanel/UserSettings";
import UserSupport from "./context/UserPanel/UserSupport";
import UserFavorites from "./context/UserPanel/UserFavorites";
import UserPayments from "./context/UserPanel/UserPayments";
import UserBookings from "./context/UserPanel/UserBookings";
import FindParking from "./context/UserPanel/FindParking";
import UserDashboard from "./context/UserPanel/UserDashboard";
import SecuritySidebar from "./components/Sidebar/SecuritySidebar";
import SecurityCheckInOut from "./context/SecurityPanel/SecurityCheckInOut";
import SecurityLiveMonitoring from "./context/SecurityPanel/SecurityLiveMonitoring";
import SecurityReports from "./context/SecurityPanel/SecurityReports";
import SecurityEmergency from "./context/SecurityPanel/SecurityEmergency";
import SecuritySettings from "./context/SecurityPanel/SecuritySettings";
import Book from "./context/UserPanel/Book";
import Layout from "./layouts/Layout";



function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Parsed User:", parsedUser);
                setUserRole(parsedUser.role);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center text-lg">Loading...</div>;
    }

    const mainContentClass = !userRole
        ? "flex-1 p-6 w-full"
        : `flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} w-full`;

    return (
        <Router>
            <ToastContainer />
            <div className="flex h-screen">
                {/* Dynamic Sidebar */}
                {userRole === "Admin" && <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
                {userRole === "ParkingOwner" && <ParkingOwnerSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
                {userRole === "User" && <UserSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
                {userRole === "Security" && <SecuritySidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

                {/* Main Content */}
                <div className={mainContentClass}>
                    <Routes>
                        {/* Authentication Routes */}
                        {!userRole && <Route path="/home" element={<Layout />} />}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Admin Routes */}
                        {userRole === "Admin" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path='/' element={<Navigate to='/admin/dashboard' />} />
                                <Route path="/admin/dashboard" element={<Dashboard />} />
                                <Route path="/admin/manage-users" element={<ManageUsers />} />
                                <Route path="/admin/parking-locations" element={<ParkingLocations />} />
                                <Route path="/admin/reservations" element={<Reservations />} />
                                <Route path="/admin/payments" element={<Payments />} />
                                <Route path="/admin/reports" element={<Reports />} />
                            </Route>
                        )}

                        {/* Parking Owner Routes */}
                        {userRole === "ParkingOwner" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                                <Route path="/owner/slots" element={<ManageParkingSlots />} />
                                <Route path="/owner/bookings" element={<OwnerBookings />} />
                                <Route path="/owner/payments" element={<OwnerPayments />} />
                                <Route path="/owner/users" element={<Users />} />
                                <Route path="/owner/reports" element={<OwnerReports />} />
                                <Route path="/owner/settings" element={<Settings />} />
                            </Route>
                        )}

                        {/* User Sidebar route */}
                        {userRole === "User" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path="/user/dashboard" element={<UserDashboard />} />
                                <Route path="/user/book" element={<Book />} />
                                <Route path="/user/find-parking" element={<FindParking />} />
                                <Route path="/user/bookings" element={<UserBookings />} />
                                <Route path="/user/payments" element={<UserPayments />} />
                                <Route path="/user/favorites" element={<UserFavorites />} />
                                <Route path="/user/support" element={<UserSupport />} />
                                <Route path="/user/settings" element={<UserSettings />} />
                            </Route>
                        )}

                        {/* Security sidebar route */}
                        {userRole === "Security" && (
                            <Route path="" element={<PrivateRoute />}>
                                <Route path="/security/checkin-out" element={<SecurityCheckInOut />} />
                                <Route path="/security/live-monitoring" element={<SecurityLiveMonitoring />} />
                                <Route path="/security/reports" element={<SecurityReports />} />
                                <Route path="/security/emergency" element={<SecurityEmergency />} />
                                <Route path="/security/settings" element={<SecuritySettings />} />
                            </Route>
                        )}


                        {/* Redirect unknown routes */}
                        {/* <Route path="*" element={<Navigate to={userRole === "Admin" ? "/admin/dashboard" : "/owner/dashboard"} />} /> */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
