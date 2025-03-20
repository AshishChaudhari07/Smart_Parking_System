import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

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
    // getAllStates();
    fetchLocations();
  }, []);

  /** Add Location */
  const handleAddLocation = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/location/add", data);
      alert("Location added successfully!");
      reset(); // Reset form fields
      fetchLocations(); // Refresh locations list
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  /** Filter locations based on search */
  const filteredLocations = locations.filter((location) =>
    location.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Parking Reservations</h1>
        <p className="text-gray-600">Select your location and find parking spots.</p>
      </div>

      {/* Location Form Section */}
      <form onSubmit={handleSubmit(handleAddLocation)} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
        <input {...register("locationName")} placeholder="Enter Location Name" className="border p-2 w-full mb-2" required />
        <input {...register("state")} placeholder="Enter State" className="border p-2 w-full mb-2" required />
        <input {...register("city")} placeholder="Enter City" className="border p-2 w-full mb-2" required />
        <input {...register("area")} placeholder="Enter Area" className="border p-2 w-full mb-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Location
        </button>
      </form>

      {/* Search Bar */}
      <div className="flex bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          placeholder="Search locations..."
          className="w-full px-4 py-3 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 px-5 text-white flex items-center hover:bg-blue-600 transition">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Available Locations */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Locations</h2>
        <div className="space-y-4">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div key={location._id} className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-red-500 text-3xl" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{location.locationName}</h3>
                    <p className="text-gray-500">{location.area}, {location.city}, {location.state}</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No locations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingLocations;
