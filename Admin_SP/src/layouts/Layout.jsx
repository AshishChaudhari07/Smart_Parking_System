import React from 'react';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Full-Screen Background Image */}
      <div 
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/images.jpg')" }}  // Directly reference public folder
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to SmartParking 🚗</h1>
          <p className="text-lg">
            Find and reserve parking spaces easily with our smart system.
          </p>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-12 px-6 text-center bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose SmartParking?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          With real-time tracking, secure bookings, and easy payment options, we make parking effortless. Join us now and experience seamless parking solutions.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} SmartParking | All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
