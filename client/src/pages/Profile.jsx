import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/auth';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit'); // Default active tab
  const [auth] = useAuth();

  return (
    <>
      <Layout>
        <div className="flex flex-col min-h-screen items-center p-4 w-full md:max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8 w-full">
            <img
              className="w-24 h-24 rounded-full border-4 border-gray-300 mb-4"
              src="https://via.placeholder.com/150" // Profile picture placeholder
              alt="Profile"
            />
            <h2 className="text-2xl font-semibold">{auth?.user ? auth?.user.name : "PLEASE LOG IN"}</h2>
            <p className="text-gray-500">@username</p>
          </div>

          {/* Tabs */}
          <div className="w-full border-b border-gray-300">
            <div className="flex justify-around text-center">
              <button
                className={`p-4 w-full text-lg font-semibold ${activeTab === 'edit' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </button>
              <button
                className={`p-4 w-full text-lg font-semibold ${activeTab === 'saved' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved
              </button>
            </div>
            {/* Animated underline */}
            <div className="relative">
              <div
                className={`absolute left-0 bottom-0 w-1/2 h-1 bg-blue-500 transition-transform duration-300 ${
                  activeTab === 'edit' ? 'transform translate-x-0' : 'transform translate-x-full'
                }`}
              ></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full mt-8">
            {activeTab === 'edit' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                {/* Edit form or details */}
                <p>This is the edit profile section.</p>
              </div>
            )}
            {activeTab === 'saved' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Saved Blogs</h3>
                {/* Saved Blogs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-lg font-semibold">Blog Title 1</h4>
                    <p className="text-gray-500">Blog description goes here.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-lg font-semibold">Blog Title 2</h4>
                    <p className="text-gray-500">Blog description goes here.</p>
                  </div> */}
                  {/* Add more saved blogs as needed */}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
