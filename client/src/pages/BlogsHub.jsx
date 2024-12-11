import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Layout from '../components/Layout';
import { ThemeContext } from '../context/ThemeContext';

const BlogsHub = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [noBlogs, setNoBlogs] = useState(false);
  const {theme} = useContext(ThemeContext);

  // Fetch blogs based on the selected category slug or all blogs
  const getBlog = async (slug = '') => {
    try {
      const endpoint = slug
        ? `${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-category/${slug}`
        : `${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-blog`;
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`
      );
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
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value;
    setSelectedCategory(categorySlug);
    getBlog(categorySlug);
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 flex justify-center">
        <div className="w-full max-w-6xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <h1 className={`${theme==="dark"?"text-white":"text-black"} text-4xl font-bold mb-4 md:mb-0`}>
              Blogs  <span className='text-red-600'> Collection  </span>
            </h1>

            {/* Category Filter Dropdown */}
            <div className="flex flex-col items-start md:flex-row md:items-center">
              <label
                className={`${theme==="dark"?"text-white":"text-black"} mr-2 mb-2 md:mb-0`}
                htmlFor="categoryFilter"
              >
                <span className={`${theme==="dark"?"text-yellow-300":"text-black"} `}> Filter </span> by Category:
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
              <p>No Blogs Available for this Category</p>
            </div>
          )}

          {/* Blog Posts in Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div key={b._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                <Link to={`/blog/${b.slug}`}>
                  {/* Blog Photo */}
                  <img
                    className="w-full h-48 object-cover"
                    src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${b._id}`}
                    alt="Blog"
                  />
                  {/* Blog Details */}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{b.title}</h2>
                    <div
                      className="text-gray-600 mb-4"
                      dangerouslySetInnerHTML={{ __html: b.description.substring(0, 100) + '...' }}
                    />
                  </div>
                </Link>

            
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogsHub;
