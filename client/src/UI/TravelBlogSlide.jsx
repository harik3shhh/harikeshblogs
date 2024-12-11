import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

const TravelBlogSlide = () => {
  const [blogs, setBlogs] = useState([]);
  const {theme} = useContext(ThemeContext);

  // Fetch travel blogs by category slug
  const getTravelBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-category/travel-blogs`);
      setBlogs(data?.blogs || []);
    } catch (error) {
      console.error('Error fetching travel blogs:', error);
    }
  };

  // Fetch travel blogs on component mount
  useEffect(() => {
    getTravelBlogs();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto my-8 p-4">
        {/* Header with Title and View More Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${theme==="dark"?"text-white":"text-black"}`}>Travel Blogs</h2>
          <NavLink to={"/travel-blogs"}>
            <button className="bg-[#2e2d2d] text-white px-4 py-2 rounded-full hover:bg-[#232323]">
              View More
            </button>
          </NavLink>
        </div>

        {/* Blog Scroll Section */}
        <div className="relative">
          <div
            className="flex space-x-6 overflow-x-auto"
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE and Edge
            }}
          >
            {/* Hide scrollbar for Webkit browsers (Chrome, Safari, etc.) */}
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {blogs.map((blog) => (
              <div key={blog._id}>
                <Link to={`/blog/${blog.slug}`}>
                  <div className="flex min-w-[350px] h-44 w-[350px] bg-gray-100 shadow-md rounded-lg cursor-pointer overflow-hidden">
                    {/* Left side: Image */}
                    <div className="w-2/5 h-full">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${blog._id}`} // Assuming 'image' field contains the image URL from backend
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Right side: Title */}
                    <div className="w-3/5 p-4 flex items-center justify-center">
                      <h3 className="text-lg font-semibold text-center">{blog.title}</h3>
                    </div>
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

export default TravelBlogSlide;
