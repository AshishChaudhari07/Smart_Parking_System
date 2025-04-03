import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ParkingReservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingSpots, setParkingSpots] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    getAllStates();
    getFavorites();
  }, []);

  const getAllStates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/location/all");
      setParkingSpots(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get("http://localhost:3000/api/favorites/favorites", config);
      setFavorites(new Set(res.data.map((fav) => fav.locationId)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (locationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (favorites.has(locationId)) {
        await axios.delete(`http://localhost:3000/api/favorites/favorites/${locationId}`, config);
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(locationId);
          return newFavorites;
        });
      } else {
        await axios.post("http://localhost:3000/api/favorites/favorites", { locationId }, config);
        setFavorites((prev) => new Set([...prev, locationId]));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Find & Reserve Parking</h1>
        <p className="text-gray-700 mt-2">Easily find and book parking spots near you.</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden p-2 mx-auto w-3/4">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full px-4 py-3 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 px-6 py-3 text-white flex items-center rounded-full hover:bg-blue-600 transition">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Map View */}
      <div className="mt-8 w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={parkingSpots.length > 0
            ? [parkingSpots[0].latitude, parkingSpots[0].longitude]
            : [22.5726, 88.3639]} // Default center if no parking spots
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {parkingSpots
            .filter(spot => spot.latitude !== undefined && spot.longitude !== undefined) // Filter out invalid locations
            .map((spot) => (
              <Marker key={spot._id} position={[spot.latitude, spot.longitude]}>
                <Popup>
                  <h3 className="text-lg font-semibold">{spot.city}</h3>
                  <p className="text-gray-500">{spot.area}</p>
                  <p className="text-green-600 font-bold">${spot.price} / hour</p>
                  <Link
                    to="/user/book"
                    state={{ parkingSpot: spot }}
                    className="mt-2 block bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600"
                  >
                    Book Now
                  </Link>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

      </div>

      {/* Available Parking Spots */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Available Parking Spots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingSpots.map((spot) => (
            <div key={spot._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-red-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{spot.city}</h3>
                  <p className="text-gray-500">{spot.area}</p>
                </div>
              </div>
              <p className="text-green-600 font-bold text-lg mt-4">${spot.price} / hour</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toggleFavorite(spot._id)}
                  className="p-3 rounded-full bg-gray-200 hover:bg-red-100 transition"
                >
                  <FaHeart
                    size={24}
                    className={`transition ${favorites.has(spot._id) ? "text-red-500 fill-current" : "text-gray-400"}`}
                  />
                </button>
                <Link
                  to="/user/book"
                  state={{ parkingSpot: spot }}
                  className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition font-medium"
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
