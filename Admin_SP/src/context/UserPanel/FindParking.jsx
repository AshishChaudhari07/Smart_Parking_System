import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ParkingReservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingSpots, setParkingSpots] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  // Fetch all parking locations
  const getAllStates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/location/all");
      setParkingSpots(res.data);
      console.log("Parking spots:", res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch user's favorite locations
  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:3000/api/favorites/favorites", config);
      const favoriteIds = new Set(res.data.map((fav) => fav.locationId));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Error fetching favorites:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllStates();
    getFavorites();
  }, []);

  // Toggle favorite status for a location
  const toggleFavorite = async (locationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (favorites.has(locationId)) {
        await axios.delete(`http://localhost:3000/api/favorites/favorites/${locationId}`, config);
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(locationId);
          return new Set([...newFavorites]);
        });
      } else {
        await axios.post("http://localhost:3000/api/favorites/favorites", { locationId }, config);
        setFavorites((prev) => new Set([...prev, locationId]));
      }
    } catch (error) {
      console.error("Error updating favorite:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Parking Reservations</h1>
        <p className="text-gray-600">Select your location and find parking spots.</p>
      </div>

      {/* Search Bar */}
      <div className="flex bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <input
          type="text"
          placeholder="Enter location..."
          className="w-full px-4 py-3 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 px-5 text-white flex items-center hover:bg-blue-600 transition">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-gray-300 mt-6 flex items-center justify-center text-gray-700 text-lg rounded-lg">
        🌍 Map View (Coming Soon)
      </div>

      {/* Available Parking Spots */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Parking Spots</h2>
        <div className="space-y-4">
          {parkingSpots.map((spot) => (
            <div
              key={spot._id} // Ensure we are using a unique key
              className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
            >
              {/* Location Details */}
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-red-500 text-3xl" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{spot.city}</h3>
                  <p className="text-gray-500">{spot.area}</p>
                </div>
              </div>

              <p className="text-green-600 font-semibold">${spot.price}</p>

              {/* Buttons Section */}
              <div className="flex items-center space-x-4">
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(spot._id)} // Ensure correct ID reference
                  className="p-2 rounded-full bg-gray-200 hover:bg-red-100 transition"
                >
                  <FaHeart
                    size={24}
                    className={`transition ${favorites.has(spot._id) ? "text-red-500 fill-current" : "text-gray-400"}`}
                  />
                </button>

                {/* Book Now Button */}
                <Link
                  to="/user/book"
                  state={{ parkingSpot: spot }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingReservations;
