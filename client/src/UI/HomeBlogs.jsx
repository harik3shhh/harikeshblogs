import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import tourindia from "../assets/tourindia.jpg";
import axios from "axios";
import { FaPlus, FaSpinner, FaBookmark } from 'react-icons/fa'; // Import save icon
import { IoAddSharp } from "react-icons/io5";
import { ThemeContext } from '../context/ThemeContext';

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {theme} = useContext(ThemeContext)

  const getBlog = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-list/${page}`);
      setBlogs(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
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

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-list/${page}`);
      setLoading(false);
      setBlogs([...blogs, ...data?.blogs]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Save blog function
  const handleSaveBlog = async (blogId) => {
    try {
      // Assuming you have an authenticated user
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/save-blog`, { blogId });
      alert("Blog saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Error saving blog. Please try again.");
    }
  };

  return (
    <>
      <Layout title={"Home - Blogs travel and tech"}>
        <div className="min-h-screen py-8 flex justify-center">
          <div className="w-full rounded-lg p-6">
            <h1 className={`${theme==="dark"?"text-white":"text-gray-800"} text-4xl font-bold text-center mb-6`}>Welcome to <span className='text-red-600'> [name] </span> – where ideas spark, stories connect, and inspiration flows. Dive in and explore a world crafted just for you!</h1>
            <p className={`${theme==="dark"?"text-gray-300":"text-gray-600"} text-center mb-16`}>
              Stay updated with the latest news, tips, and insights from our blogs.
            </p>

            {/* Blog Posts */}
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

            {/* Load More Button */}
            <div className="flex justify-center mt-8">
              {blogs && blogs.length < total && (
                <button
                  className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500 hover:border-gray-700 text-gray-700 transition-colors duration-300 hover:text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <IoAddSharp size={35} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomeBlogs;
