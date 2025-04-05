import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo or App Name */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          🚗 SmartParking
        </Link>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="border border-white text-white font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
