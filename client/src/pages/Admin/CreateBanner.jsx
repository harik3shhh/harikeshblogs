import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';

const CreateBanner = () => {
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState('');
  const [banners, setBanners] = useState([]);

  // Fetch existing banners
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-banner`);
      if (data?.success) {
        setBanners(data?.banner);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link || !photo) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const blogData = new FormData();
      blogData.append('link', link);
      blogData.append('photo', photo);

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/create-banner`, blogData);
      if (data?.success) {
        toast.success('Banner Created Successfully');
        setLink('');
        setPhoto('');
        fetchBanners(); // Refresh the banner list after creation
      } else {
        toast.error('Failed to Create Banner');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while creating Banner');
    }
  };

  const handleDelete = async (id) => {
    if (banners.length === 1) {
      toast.error('Cannot delete the last remaining banner');
      return;
    }

    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/delete-banner/${id}`);
      if (data?.success) {
        toast.success('Banner Deleted Successfully');
        fetchBanners(); // Refresh the banner list after deletion
      } else {
        toast.error('Failed to Delete Banner');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while deleting Banner');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">
        {/* Banner Creation Form */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">CREATE A NEW BANNER</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
                  Banner Link
                </label>
                <input
                  id="link"
                  type="text"
                  name="link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter banner link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                  Upload Banner Image
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                <p className="text-xs text-gray-500 mt-2">Image should be less than 1 MB.</p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Banner
                </button>
                <button
                  type="reset"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setLink('');
                    setPhoto('');
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Banner List */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">BANNER LIST</h2>
            {banners.length > 0 ? (
              <ul>
                {banners.map((banner) => (
                  <li key={banner._id} className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-4">
                      <img src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/banner-photo/${banner._id}`} alt="Banner" className="w-20 h-20 object-cover rounded" />
                      <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {banner.link}
                      </a>
                    </div>
                    {banners.length > 1 && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none"
                        onClick={() => handleDelete(banner._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No banners available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBanner;
