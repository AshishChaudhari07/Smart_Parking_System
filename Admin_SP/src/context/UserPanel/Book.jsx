import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Book = () => {
  const location = useLocation();
  const parkingSpot = location.state?.parkingSpot || null; // Receiving data from previous page
  console.log(parkingSpot)
  console.log(parkingSpot.locationId)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();


  const [bookings, setBookings] = useState([])

  const allBooking = async () => {

    try {

      const response = await axios.get('http://localhost:3000/api/reservation/all')
      console.log(response.data)
      setBookings(response.data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    allBooking();
  }, [])



  useEffect(() => {
    if (parkingSpot) {
      setTotalPrice(parkingSpot.price * duration);
    }
  }, [duration, parkingSpot]);

  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select date and time.");
      return;
    }

    const token = localStorage.getItem("token"); 
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.", {
        position: "top-right",
        theme: "dark",
      });
      navigate("/login");
      return;
    }

    const calculateEndTime = (startTime, duration) => {
      if (!startTime) return "00:00";
    
      const [hours, minutes] = startTime.split(":").map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid startTime format:", startTime);
        return "00:00";
      }
    
      let endHours = hours + Number(duration);
      let endMinutes = minutes;
    
      if (endHours >= 24) {
        endHours = endHours % 24;
      }
    
      return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
    };
    


    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser._id : null;

    // Ensure bookings exist before accessing parking data
    const selectedBooking = bookings.length > 0 ? bookings[0] : null;

    if (!selectedBooking) {
      console.error("No booking data available");
    } else {
      console.log("Selected Booking Data:", selectedBooking);
    }

    const bookingDetails = {
      userId,
      parkingSlotId: selectedBooking ? selectedBooking.parkingSlotId._id : null, 
      parkingId: selectedBooking ? selectedBooking.parkingId._id : null, 
      locationId: parkingSpot.locationId, // Add fallback value
      date,
      vehicleId: selectedBooking ? selectedBooking.vehicleId._id : "some-vehicle-id",
      startTime: time,
      endTime: calculateEndTime(time, duration),
      paymentStatus: "Pending",
      amountPaid: totalPrice,
      securityAmountPaid: selectedBooking ? selectedBooking.securityAmountPaid : 0,
    };
    

    console.log("Final Booking Details:", bookingDetails);


    try {
      const response = await axios.post("http://localhost:3000/api/reservation/add", bookingDetails, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message, {
        position: "top-right",
        theme: "dark",
      })
      navigate("/user/bookings");
    } catch (error) {
      console.error("Error booking:", error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
        theme: "dark",
      })
    }
  };

  if (!parkingSpot) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-600">
        No parking spot selected. Please go back.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Confirm Your Booking</h1>

      {/* Parking Spot Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-4">
          <FaMapMarkerAlt className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">{parkingSpot.city}, {parkingSpot.area}</h2>
            <p className="text-gray-500">Price per hour: ₹{parkingSpot.price}</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Select Date */}
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500 text-xl" />
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Select Time */}
          <div className="flex items-center space-x-3">
            <FaClock className="text-green-500 text-xl" />
            <input
              type="time"
              className="w-full p-2 border rounded-md"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Select Duration */}
          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-yellow-500 text-xl" />
            <select
              className="w-full p-2 border rounded-md"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="5">5 Hours</option>
              <option value="10">10 Hours</option>
            </select>
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold text-green-600">
            Total Price: ₹{parkingSpot.amountPaid}
          </div>

          {/* Confirm Booking Button */}
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;










// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
// import { toast } from "react-toastify";

// const Book = () => {
//   const location = useLocation();
//   const parkingSpot = location.state?.parkingSpot || null;
//   console.log("Parking Spot Data:", parkingSpot);

//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [duration, setDuration] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (parkingSpot?.price) {
//       setTotalPrice(parkingSpot.price * duration);
//     }
//   }, [duration, parkingSpot]);

//   const calculateEndTime = (startTime, duration) => {
//     if (!startTime) return "00:00";

//     const [hours, minutes] = startTime.split(":").map(Number);
//     let endHours = hours + Number(duration);
//     let endMinutes = minutes;

//     if (endHours >= 24) {
//       endHours = endHours % 24;
//     }

//     return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
//   };

//   const handleBooking = async () => {
//     if (!date || !time) {
//       toast.error("Please select a date and time.", { position: "top-right", theme: "dark" });
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication token is missing. Please log in again.", { position: "top-right", theme: "dark" });
//       navigate("/login");
//       return;
//     }

//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const userId = storedUser ? storedUser._id : null;

//     if (!parkingSpot) {
//       toast.error("No parking spot selected.", { position: "top-right", theme: "dark" });
//       return;
//     }

//     const endTime = calculateEndTime(time, duration);
//     const amountPaid = (parkingSpot?.price || 0) * duration;

//     const bookingDetails = {
//       userId,
//       parkingSlotId: parkingSpot._id, 
//       parkingId: parkingSpot.parkingId ,
//       locationId: parkingSpot.locationId ,
//       date,
//       vehicleId: parkingSpot.vehicleId,
//       startTime: time,
//       endTime,
//       paymentStatus: "Pending",
//       amountPaid,
//       securityAmountPaid: 100,
//     };

//     console.log("Final Booking Details:", bookingDetails);

//     try {
//       const response = await axios.post("http://localhost:3000/api/reservation/add", bookingDetails, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success(response.data.message, { position: "top-right", theme: "dark" });
//       navigate("/user/bookings");
//     } catch (error) {
//       console.error("Error booking:", error);
//       toast.error(error.response?.data?.message || "Something went wrong", {
//         position: "top-right",
//         theme: "dark",
//       });
//     }
//   };

//   if (!parkingSpot) {
//     return <div className="h-screen flex items-center justify-center text-xl text-red-600">No parking spot selected. Please go back.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Confirm Your Booking</h1>

//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <div className="flex items-center space-x-3 mb-4">
//           <FaMapMarkerAlt className="text-red-500 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">{parkingSpot.city}, {parkingSpot.area}</h2>
//             <p className="text-gray-500">Price per hour: ₹{parkingSpot.price}</p>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center space-x-3">
//             <FaCalendarAlt className="text-blue-500 text-xl" />
//             <input type="date" className="w-full p-2 border rounded-md" value={date} onChange={(e) => setDate(e.target.value)} />
//           </div>

//           <div className="flex items-center space-x-3">
//             <FaClock className="text-green-500 text-xl" />
//             <input type="time" className="w-full p-2 border rounded-md" value={time} onChange={(e) => setTime(e.target.value)} />
//           </div>

//           <div className="flex items-center space-x-3">
//             <FaMoneyBillWave className="text-yellow-500 text-xl" />
//             <select className="w-full p-2 border rounded-md" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//               <option value="1">1 Hour</option>
//               <option value="2">2 Hours</option>
//               <option value="3">3 Hours</option>
//               <option value="5">5 Hours</option>
//               <option value="10">10 Hours</option>
//             </select>
//           </div>

//           <div className="text-lg font-semibold text-green-600">Total Price: ₹{totalPrice}</div>

//           <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition" onClick={handleBooking}>
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;
