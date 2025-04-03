import React, { useState } from "react";
import { FaUser, FaUsers, FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Ravi Sharma", email: "ravi@gmail.com", role: "User", status: "Active" },
        { id: 2, name: "Pooja Patel", email: "pooja@gmail.com", role: "Admin", status: "Inactive" },
        { id: 3, name: "Amit Singh", email: "amit@gmail.com", role: "User", status: "Active" },
    ]);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            {/* Header */}
            <h2 className="text-4xl font-bold text-center tracking-wide drop-shadow-lg">👥 Manage Users</h2>
            <p className="text-center text-gray-300 mt-2">View and manage registered users efficiently.</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {[
                    { title: "Total Users", value: users.length, color: "bg-blue-500", icon: <FaUsers size={30} /> },
                    { title: "Active Users", value: users.filter(user => user.status === "Active").length, color: "bg-green-500", icon: <FaUser size={30} /> },
                    { title: "Admins", value: users.filter(user => user.role === "Admin").length, color: "bg-yellow-500", icon: <FaUser size={30} /> },
                ].map((card, index) => (
                    <div key={index} className={`p-6 ${card.color} text-white rounded-lg flex items-center space-x-4 shadow-lg transition-all transform hover:scale-105`}>
                        {card.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-2xl">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-2/3">
                    <input
                        type="text"
                        placeholder="🔍 Search by user name..."
                        className="w-full p-3 pl-12 border border-gray-500 bg-gray-800 text-white rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                    <FaFilter />
                    <span>Filter</span>
                </button>
            </div>

            {/* Users Table */}
            <div className="mt-10 bg-gray-700 bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4">📌 Registered Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white">
                        <thead className="bg-gray-800 bg-opacity-50 text-gray-300 text-lg uppercase">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg">
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-800 transition-all duration-300 hover:bg-gray-700 hover:bg-opacity-50 hover:shadow-lg">
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className={`p-4 font-semibold ${user.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                                        {user.status}
                                    </td>
                                    <td className="p-4 flex space-x-4">
                                        <button className="text-blue-400 hover:underline flex items-center space-x-1 transition-all">
                                            <FaEdit />
                                            <span>Edit</span>
                                        </button>
                                        <button className="text-red-400 hover:underline flex items-center space-x-1 transition-all">
                                            <FaTrash />
                                            <span>Delete</span>
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
