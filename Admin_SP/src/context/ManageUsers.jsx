import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/user/all", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error.response?.data || error.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/user/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Manage Users</h1>
                <button className="flex items-center bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300">
                    <FaPlus className="mr-2" /> Add User
                </button>
            </div>

            <div className="mt-4 flex items-center bg-white p-3 rounded-lg shadow-lg">
                <FaSearch className="text-gray-500 ml-2" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-2 outline-none text-gray-800"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>

                {loading ? (
                    <p className="text-gray-600">Loading users...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                                    <th className="border p-3">Name</th>
                                    <th className="border p-3">Email</th>
                                    <th className="border p-3">Role</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users
                                        .filter(user => user.firstName.toLowerCase().includes(search.toLowerCase()))
                                        .map(user => (
                                            <tr key={user._id} className="text-center bg-gray-100 hover:bg-gray-200 transition">
                                                <td className="border p-3 text-gray-800">{user.firstName}</td>
                                                <td className="border p-3 text-gray-600">{user.email}</td>
                                                <td className="border p-3 text-gray-600">{user.role}</td>
                                                <td className="border p-3 flex justify-center space-x-4">
                                                    <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(user._id)}>
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="border p-3 text-center text-gray-600">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
