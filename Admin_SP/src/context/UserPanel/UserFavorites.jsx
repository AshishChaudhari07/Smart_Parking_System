import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaMapMarkerAlt, FaStar, FaTrashAlt } from "react-icons/fa";

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
        headers: { Authorization: `Bearer ${token}` }, // Added "Bearer " prefix
      });

      console.log("Fetched favorites:", res.data);
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
        headers: { Authorization: `Bearer ${token}` }, // Fixed missing "Bearer "
      });

      setFavorites((prev) => prev.filter((fav) => fav._id !== id)); // Update UI smoothly
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaHeart className="text-red-500 mr-2" /> Favorite Parking Spots
        </h1>
        <p className="text-gray-600">Easily access your preferred locations.</p>
      </div>

      {/* Favorites List */}
      <div className="space-y-4">
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite spots yet.</p>
        ) : (
          favorites.map((fav) => {
            const location = fav.locationId || {}; // Ensure locationId is not null/undefined
            return (
              <div key={fav._id} className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
                {/* Location Details */}
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-blue-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {location.locationName || "Unknown Location"}
                    </h3>
                    <p className="text-gray-500">{location.distance || "1 KM"} away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar className="mr-1" /> {location.rating || "4.6"}
                    </p>
                  </div>
                </div>

                {/* Remove from Favorites Button */}
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => removeFavorite(fav._id)}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserFavorites;
