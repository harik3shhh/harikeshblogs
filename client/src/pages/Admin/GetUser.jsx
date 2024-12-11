import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { ThemeContext } from '../../context/ThemeContext';



const GetUser = () => {
    const [auth] = useAuth();
    const [users, setUsers] = useState([]);
    const {theme} = useContext(ThemeContext);
 

    const getUser = async () => {
        const config = {
            headers: {
                Authorization: `${auth.token}`,
            },
        };

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/get-all-user`, config);
            // Sorting users: admins first, then non-admins alphabetically
            const sortedUsers = data?.allusers.sort((a, b) => {
                if (a.role === 1 && b.role !== 1) return -1; // Admins first
                if (a.role !== 1 && b.role === 1) return 1;  // Non-admins last
                return a.name.localeCompare(b.name); // Alphabetical sorting
            });
            setUsers(sortedUsers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdate = async (id) => {
        // Implement update logic here
    };

    const handleDelete = async (id) => {
        const config = {
            headers: {
                Authorization: `${auth?.token}`,
            },
        };

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/auth/delete-user/${id}`, config);
            if (data?.success) {
                toast.success("USER DELETED");
                getUser();
            } else {
                toast.error("UNABLE TO DELETE");
            }
        } catch (error) {
            console.log("error");
        }
    };

    const handleRoleChange = async (id, newRole) => {
        const config = {
            headers: {
                Authorization: `${auth?.token}`,
            },
        };

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/auth/admin-access/${id}`, { role: newRole }, config);
            if (data?.success) {
                toast.success("User role updated");
                getUser();
            } else {
                toast.error("Failed to update user role");
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("Failed to update user role");
        }
    };

    return (
        <Layout>
        <div className={`min-h-screen  rounded-lg  m-2  p-4 md:p-6 lg:p-8`}
       
        >
            <h1 className={`text-indigo-500 rounded-lg shadow-lg p-6 text-3xl font-extrabold mb-6 text-center`}>REGISTERED USERS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                    >
                        <div className="flex items-center mb-3">
                            <div className="text-gray-800 text-2xl font-bold">{user.name}</div>
                            {user.role === 1 && (
                                <span className="ml-3 text-sm font-semibold text-green-600 bg-green-200 px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                        <div className="text-gray-600 mb-2">Email: {user.email}</div>
                        <div className="text-gray-600 mb-2">Phone: {user.phone}</div>
                        {/* Conditionally render the role management options */}
                        {auth.user._id !== user._id && (
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => handleRoleChange(user._id, user.role === 1 ? 0 : 1)}
                                    className={`transition-colors duration-300 p-2 rounded-full ${
                                        user.role === 1
                                            ? 'text-red-600 hover:text-red-800 hover:bg-red-100'
                                            : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                                    }`}
                                    aria-label="Toggle User Status"
                                >
                                    {user.role === 1 ? (
                                        <FaUserMinus className="w-5 h-5" />
                                    ) : (
                                        <FaUserPlus className="w-5 h-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-600 hover:text-red-800 transition-colors duration-300 p-2 rounded-full hover:bg-red-100"
                                    aria-label="Delete User"
                                >
                                    <FaTrashAlt className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
};

export default GetUser;
