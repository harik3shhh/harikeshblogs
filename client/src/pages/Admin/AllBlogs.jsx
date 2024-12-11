import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [total, setTotal] = useState(0);
  const [noBlogs, setNoBlogs] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for delete operation
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [currentBlog, setCurrentBlog] = useState({}); // State for storing current blog data

  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  // Fetch blogs based on the selected category slug or all blogs
  const getBlog = async (slug = '') => {
    try {
      const endpoint = slug ? `${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-category/${slug}` : `${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-blog`;
      const { data } = await axios.get(endpoint);
      setBlogs(data?.blogs);
      setNoBlogs(data?.blogs.length === 0);
    } catch (error) {
      console.log(error);
      setNoBlogs(true);
    }
  };

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog(); // Fetch all blogs by default
    getAllCategory();
    getTotal();
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt('Are you sure you want to delete this blog?');
      if (!answer) return;
      const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/delete-blog/${id}`);
      toast.success('Blog Deleted Successfully');
      getBlog(selectedCategory); // Refresh the blogs after deletion
    } catch (error) {
      console.log(error);
      toast.error('Error while deleting blog');
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value; // Get the selected category slug
    setSelectedCategory(categorySlug); // Update selected category
    getBlog(categorySlug); // Fetch blogs based on the selected category or all blogs
  };

  return (
    <Layout>
      <div className=" min-h-screen py-8 flex justify-center">
        <div className="w-full max-w-6xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <h1 className="text-4xl font-bold text-indigo-500 mb-4 md:mb-0">
              BLOGS YOU PUBLISHED
            </h1>

            {/* Category Filter Dropdown */}
            <div className="flex flex-col items-start md:flex-row md:items-center">
              <label className="mr-2 text-gray-600 mb-2 md:mb-0" htmlFor="categoryFilter">
                Filter by Category:
              </label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Display message if no blogs for the selected category */}
          {noBlogs && (
            <div className="text-center text-3xl mt-60 text-red-600 mb-4">
              <p>NO BLOGS FOR THIS CATEGORY</p>
            </div>
          )}

          {/* Dynamically Rendered Blog Posts */}
          <div className="space-y-6">
            {blogs.map((b) => (
              <div key={b._id} className="relative">
                <Link to={`/blog/${b.slug}`}>
                  <div className="flex flex-col md:flex-row bg-blue-50 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl mb-6">
                    {/* Blog Photo on the left */}
                    <img
                      className="w-full md:w-64 h-48 object-cover"
                      src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${b._id}`}
                      alt="Blog"
                    />

                    {/* Blog Details on the right */}
                    <div className="p-6 flex flex-col justify-between relative">
                      <h2 className="text-2xl font-semibold mb-2 mt-2">{b.title}</h2>
                      <div
                        className="text-gray-600 mb-4"
                        dangerouslySetInnerHTML={{ __html: b.description.substring(0, 50) }}
                      />
                    </div>
                  </div>
                </Link>

                {/* Blog Actions on the right side outside the card */}
                <div className="absolute top-0 right-0 p-4 flex space-x-4">
                  {/* Update Icon */}
                  <NavLink to={`/update-blog/${b.slug}`}><FaEdit
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    size={20}
                  /></NavLink>

                  {/* Delete Icon */}
                  <FaTrashAlt
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={20}
                    onClick={() => handleDelete(b._id)}
                  />
                </div>

                {/* Views at the bottom right inside the card */}
                <div className="absolute bottom-4 right-4 text-gray-600 flex items-center">
                  <FaEye size={20} />
                  <span className="ml-2">{b.views || 0} Views</span>
                </div>
              </div>
            ))}
          </div>

          {/* Update Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={5}
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllBlogs;
  