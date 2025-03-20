import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("id");


  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/reservation/user/${_id}`);
      console.log(res.data)
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching user bookings", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>{booking.parkingTag} - {booking.date}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
