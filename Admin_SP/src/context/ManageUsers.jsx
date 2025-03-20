import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);  // Users from backend
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch Users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/user/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("API Response:", response.data);
    
            setUsers(response.data); 
            console.log(users)

        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };


    // Handle Delete User
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`http://localhost:3000/api/user/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setUsers(users.filter(user => user._id !== id)); // Remove from state
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };


    // Load users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
                <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    
                >
                    <FaPlus className="mr-2" /> Add User
                </button>
            </div>

            <p className="mt-2 text-gray-600">View, add, and remove users from the system.</p>

            {/* Search Bar */}
            <div className="mt-4 flex items-center bg-white p-2 rounded-lg shadow-md">
                <FaSearch className="text-gray-500 ml-2" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-2 outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* User Table */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">User List</h2>

                {loading ? (
                    <p className="text-gray-600">Loading users...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Role</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 && users
                                    .filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()))
                                    .map(user => (
                                        <tr key={user._id} className="text-center">
                                            <td className="border p-2">{user.firstName}</td>
                                            <td className="border p-2">{user.email}</td>
                                            <td className="border p-2">{user.role}</td>
                                            <td className="border p-2 flex justify-center space-x-4">
                                                <button
                                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
