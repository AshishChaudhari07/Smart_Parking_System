import React, { useState } from "react";
import { FaUser, FaUsers, FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
    // Example user data (Replace with real API data)
    const [users, setUsers] = useState([
        { id: 1, name: "Ravi Sharma", email: "ravi@gmail.com", role: "User", status: "Active" },
        { id: 2, name: "Pooja Patel", email: "pooja@gmail.com", role: "Admin", status: "Inactive" },
        { id: 3, name: "Amit Singh", email: "amit@gmail.com", role: "User", status: "Active" },
    ]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
            <p className="text-gray-500">View and manage registered users.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center space-x-4">
                    <FaUsers size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-2xl">{users.length}</p>
                    </div>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg flex items-center space-x-4">
                    <FaUser size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Active Users</h3>
                        <p className="text-2xl">{users.filter(user => user.status === "Active").length}</p>
                    </div>
                </div>
                <div className="p-4 bg-yellow-500 text-white rounded-lg flex items-center space-x-4">
                    <FaUser size={30} />
                    <div>
                        <h3 className="text-lg font-semibold">Admins</h3>
                        <p className="text-2xl">{users.filter(user => user.role === "Admin").length}</p>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="mt-6 flex space-x-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search by user name..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                    <FaFilter />
                    <span>Filter</span>
                </button>
            </div>

            {/* Users Table */}
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Registered Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-left">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className={`p-3 font-semibold ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                                        {user.status}
                                    </td>
                                    <td className="p-3 flex space-x-3">
                                        <button className="text-blue-500 hover:underline">
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="text-red-500 hover:underline">
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
