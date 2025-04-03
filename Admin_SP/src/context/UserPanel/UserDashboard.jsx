import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarCheck, FaMoneyBillWave, FaHeart, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsRes = await axios.get("http://localhost:3000/api/reservation/all");
        setBookings(bookingsRes.data);

        const paymentsRes = await axios.get("http://localhost:3000/api/payments");
        setPayments(paymentsRes.data);

        const favoritesRes = await axios.get("http://localhost:3000/api/favorites/favorites", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setFavorites(favoritesRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">Welcome Back! 🚗</h1>
        <p className="text-lg text-gray-700 mt-2">Manage your bookings, payments, and favorites easily.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {[ 
          { title: "My Bookings", count: bookings.length, icon: <FaCalendarCheck className="text-blue-500 text-4xl" />, bg: "bg-white" },
          { title: "Payments", count: payments.length, icon: <FaMoneyBillWave className="text-green-500 text-4xl" />, bg: "bg-white" },
          { title: "Favorites", count: favorites.length, icon: <FaHeart className="text-red-500 text-4xl" />, bg: "bg-white" },
          { title: "Find Parking", count: "-", icon: <FaMapMarkedAlt className="text-purple-500 text-4xl" />, bg: "bg-white" }
        ].map((item, index) => (
          <div key={index} className={`${item.bg} shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105`}> 
            {item.icon}
            <h2 className="text-lg font-semibold text-gray-700 mt-2">{item.title}</h2>
            <p className="text-xl font-bold text-gray-600">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/user/find-parking" className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            <FaSearch className="mr-2" /> Find Parking
          </Link>
          <Link to="/user/bookings" className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
            <FaCalendarCheck className="mr-2" /> View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;