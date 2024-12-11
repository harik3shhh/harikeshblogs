import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

const TravelBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const {theme} = useContext(ThemeContext);

  // Fetch tech blogs by category slug (e.g., 'tech')
  const getTravelBlogs = async () => {
    try {
      // Assuming 'tech' is the category slug for tech blogs
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-category/travel-blogs`);
      setBlogs(data?.blogs || []);
    } catch (error) {
      console.error('Error fetching tech blogs:', error);
    }
  };

  // Fetch tech blogs on component mount
  useEffect(() => {
    getTravelBlogs();
  }, []);

  return (
    <Layout title='Travel Blogs - Love to Travel'>
      <div className="min-h-screen mx-auto my-8 p-4">
        {/* Header with Title and View More Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${theme==="dark"?"text-white":"text-black"} text-2xl m-auto mb-8 font-bold`}>TRAVEL BLOGS - Read Feel & Explore</h2>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

{/* Dynamically Rendered Blog Posts */}
{blogs.map((b) => (
  <div key={b._id} className="relative">
    <Link to={`/blog/${b.slug}`}>
      <div className="bg-white rounded-lg transition-shadow lg:h-[440px] duration-300">
        <img
          className="rounded-t-lg h-48 w-full object-cover"
          src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${b._id}`}
          alt="Blog"
        />
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">{b.title.substring(0, 50) + "..."}</h2>
          {/* Render blog description as HTML */}
          <div
            className="text-gray-600 mb-4"
            dangerouslySetInnerHTML={{ __html: b.description.substring(0,60) + "..." }}
          />
        </div>
      </div>
    </Link>

    {/* Save Icon */}
    <button
      onClick={() => handleSaveBlog(b._id)}
      className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-200"
    >
      {/* <FaBookmark size={24} /> */}
    </button>
  </div>
))}
</div>
      </div>
    </Layout>
  );
};

export default TravelBlogs;
            