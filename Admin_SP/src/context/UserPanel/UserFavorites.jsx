import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaMapMarkerAlt, FaStar, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite parking spots from backend
  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Error: No token found in localStorage.");
        return;
      }

      const res = await axios.get("http://localhost:3000/api/favorites/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorites:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  // Remove a favorite
  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:3000/api/favorites/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaHeart className="text-red-500 mr-2" /> Favorite Parking Spots
        </h1>
        <p className="text-gray-600">Easily access your preferred locations.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No favorite spots yet.</p>
          <Link
            to="/user/find-parking"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Discover Parking Spots
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const location = fav.locationId || {};
            return (
              <motion.div
                key={fav._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white shadow-xl rounded-lg flex justify-between items-center transition-transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-blue-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{location.locationName || "Unknown Location"}</h3>
                    <p className="text-gray-500">{location.distance || "1 KM"} away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar className="mr-1" /> {location.rating || "4.6"}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => removeFavorite(fav._id)}
                >
                  <FaTrashAlt size={20} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;