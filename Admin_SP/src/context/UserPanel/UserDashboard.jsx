import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarCheck, FaMoneyBillWave, FaHeart, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user bookings
        const bookingsRes = await axios.get("http://localhost:3000/api/reservation/all");
        setBookings(bookingsRes.data);

        // Fetch user payments
        const paymentsRes = await axios.get("http://localhost:3000/api/payments");
        setPayments(paymentsRes.data);

        // Fetch user favorite parking spots
        // const favoritesRes = await axios.get("http://localhost:5000/api/favorites/user/USER_ID");
        // setFavorites(favoritesRes.data || []);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleViewBookings = () => {
    navigate("/my-bookings");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back! 🚗</h1>
        <p className="text-gray-600">Manage your bookings, payments, and favorite parking spots easily.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <FaCalendarCheck className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">My Bookings</h2>
            <p className="text-gray-500">{bookings.length} active reservations</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <FaMoneyBillWave className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Payments</h2>
            <p className="text-gray-500">{payments.length} transactions</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <FaHeart className="text-red-500 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Favorites</h2>
            <p className="text-gray-500">{favorites.length} saved spots</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
          <FaMapMarkedAlt className="text-purple-500 text-4xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Find Parking</h2>
            <p className="text-gray-500">Locate the best parking spaces</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <button className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            <FaSearch className="mr-2" /> Find Parking
          </button>
          <button onClick={handleViewBookings} className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
            <FaCalendarCheck className="mr-2" /> View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
