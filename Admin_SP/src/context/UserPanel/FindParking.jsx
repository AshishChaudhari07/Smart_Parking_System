import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaParking } from "react-icons/fa";

const ParkingReservations = () => {

  

  const { register, handleSubmit } = useForm();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingSpots, setParkingSpots] = useState([]);

  // Fetch States
  const getAllStates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/location/all");
      console.log(res.data)
      setParkingSpots(res.data);
      setStates(res.data)
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch Cities based on selected state
  const getAllCities = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/location/single/${id}`);
      setCities(res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Fetch Areas based on selected city
  const getAreasByCity = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/location/single/${id}`);
      setAreas(res.data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  useEffect(() => {
    getAllStates();
    getAllCities();
    getAreasByCity();
  }, []);

  const submitHandler = (data) => {
    console.log("Reservation Data:", data);
  };


  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Parking Reservations</h1>
        <p className="text-gray-600">Select your location and find parking spots.</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(submitHandler)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block font-semibold">Select State</label>
          <select
            {...register("stateId")}
            className="w-full p-2 border rounded-md"
            onChange={(e) => getAllCities(e.target.value)}
          >
            <option value="">Select State</option>
            {states?.map((state) => (
              <option key={state._id} value={state._id}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select City</label>
          <select
            {...register("cityId")}
            className="w-full p-2 border rounded-md"
            onChange={(e) => getAreasByCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities?.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Area</label>
          <select {...register("areaId")} className="w-full p-2 border rounded-md">
            <option value="">Select Area</option>
            {areas?.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Submit Reservation
        </button>
      </form>

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
              key={spot.id}
              className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-red-500 text-3xl" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{spot.city}</h3>
                  <p className="text-gray-500">{spot.area}</p>
                </div>
              </div>
              <p className="text-green-600 font-semibold">{spot.price}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingReservations;
