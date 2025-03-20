import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/user/login", formData);
            const { token, user } = response.data;

            // Store token and user info in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-right",
                    theme: "dark",
                })
            }

            // Redirect based on role
            if (user.role === "Admin") {
                navigate("/admin/dashboard");
                window.location.reload();
            } else if (user.role === "ParkingOwner") {
                navigate("/parking-owner-dashboard");
                window.location.reload();
            } else if (user.role === "Security") {
                navigate("/security-dashboard");
                window.location.reload();
            } else {
                navigate("/dashboard");
                window.location.reload();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-right",
                theme: "dark",
            })
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-600 text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
