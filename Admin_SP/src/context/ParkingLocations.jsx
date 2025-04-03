import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaPlusCircle } from "react-icons/fa";

const ParkingLocations = () => {
  const { register, handleSubmit, reset } = useForm();
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /** Fetch Locations */
  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/location/all");
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  /** Add Location */
  const handleAddLocation = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/location/add", data);
      alert("Location added successfully!");
      reset();
      fetchLocations();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  /** Filter locations based on search */
  const filteredLocations = locations.filter((location) =>
    location.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Parking Reservations</h1>
        <p className="text-lg text-gray-200">Find and reserve your parking spot with ease.</p>
      </div>

      {/* Location Form */}
      <form
        onSubmit={handleSubmit(handleAddLocation)}
        className="bg-white p-6 rounded-lg shadow-xl mb-6 text-gray-800"
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaPlusCircle className="mr-2 text-blue-600" /> Add New Location
        </h2>
        <input
          {...register("locationName")}
          placeholder="Enter Location Name"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          {...register("state")}
          placeholder="Enter State"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          {...register("city")}
          placeholder="Enter City"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          {...register("area")}
          placeholder="Enter Area"
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Add Location
        </button>
      </form>

      {/* Search Bar */}
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          placeholder="Search locations..."
          className="w-full px-4 py-3 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 px-6 text-white flex items-center hover:bg-blue-600 transition-all">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Available Locations */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Available Locations</h2>
        <div className="space-y-6">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div
                key={location._id}
                className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between transform transition hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-red-500 text-3xl" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{location.locationName}</h3>
                    <p className="text-gray-600">{location.area}, {location.city}, {location.state}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-200">No locations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingLocations;
