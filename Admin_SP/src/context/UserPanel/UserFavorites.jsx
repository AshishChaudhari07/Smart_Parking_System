import React from "react";
import { FaHeart, FaMapMarkerAlt, FaStar, FaTrashAlt } from "react-icons/fa";

const UserFavorites = () => {
  // Dummy data for favorite parking spots
  const favorites = [
    {
      id: 1,
      name: "City Center Parking",
      distance: "1.2 km",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Downtown Garage",
      distance: "2.5 km",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Mall Parking Zone",
      distance: "800 m",
      rating: 4.7,
    },
  ];

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
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{fav.name}</h3>
                <p className="text-gray-500">{fav.distance} away</p>
                <p className="text-yellow-500 flex items-center">
                  <FaStar className="mr-1" /> {fav.rating}
                </p>
              </div>
            </div>

            {/* Remove from Favorites Button */}
            <button className="text-red-500 hover:text-red-700 transition">
              <FaTrashAlt size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFavorites;
