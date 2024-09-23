import React, { useContext } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaUsers, FaServer, FaTasks, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';


import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';


const AdminDashboard = () => {
  const [auth] = useAuth();


  return (
    <Layout>
    <div className="flex flex-col min-h-screen m-2 rounded-lg shadow-l text-gray-200"
   >
    
      {/* Heading */}
      <header className="p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-500">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-8">
          <h1 className={`text-black text-4xl font-extrabold mb-4 lg:mb-0`}>Welcome {!auth?.user ? "" : auth?.user.name} !</h1>
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 shadow-lg">
              Create New
            </button>
            <button className="bg-gray-800 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg">
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaUsers className="text-4xl text-blue-500 mr-4" />
              <h2 className="text-2xl font-bold">User Management</h2>
            </div>
            <p className="text-gray-400">Manage user accounts, roles, and permissions with ease. Keep track of user activities and handle user-related tasks efficiently.</p>
            <button  className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg">
              <NavLink to="/users">View Users</NavLink>
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaServer className="text-4xl text-green-500 mr-4" />
              <h2 className="text-2xl font-bold">Manage Orders</h2>
            </div>
            <p className="text-gray-400">Monitor the health of your system. View real-time status updates, track server performance, and manage system resources.</p>
            <button className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-lg">
              Check Status
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaTasks className="text-4xl text-purple-500 mr-4" />
              <h2 className="text-2xl font-bold">Manage Blogs</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <button className="bg-gray-700 p-2 rounded-lg">Create Category</button>
                {/* <span className="text-gray-400">Today</span> */}
              </li>
              <li className="flex justify-between items-center">
              <NavLink to="/publish-blog "> <button className="bg-gray-700 p-2 rounded-lg">Create Blogs</button></NavLink>
                {/* <span className="text-gray-400">Tomorrow</span> */}
              </li>
              <li className="flex justify-between items-center">
                {/* <button className="bg-gray-700 p-2 rounded-lg">Update Blogs</button> */}
                {/* <span className="text-gray-400">This week</span> */}
              </li>
            </ul>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg">
              View All Blogs
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-4xl text-orange-500 mr-4" />
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <span className="bg-gray-700 p-2 rounded-lg">Team Meeting</span>
                <span className="text-gray-400">August 30</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="bg-gray-700 p-2 rounded-lg">Server Maintenance</span>
                <span className="text-gray-400">September 5</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="bg-gray-700 p-2 rounded-lg">Project Review</span>
                <span className="text-gray-400">September 10</span>
              </li>
            </ul>
            <button className="mt-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-800 transition-all duration-300 shadow-lg">
              View Calendar
            </button>
          </div>

          {/* New Cards */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-4xl text-teal-500 mr-4" />
              <h2 className="text-2xl font-bold">FEEBACKS</h2>
            </div>
            
            <button className="mt-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300 shadow-lg">
              View All Messages
            </button>
          </div>
        </div>
      </main>
    </div>
    </Layout> 
  );
};

export default AdminDashboard;
