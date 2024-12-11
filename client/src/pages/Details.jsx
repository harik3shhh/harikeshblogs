import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Details = () => {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [allblog, setAllBlog] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // State for managing description toggle

  // Helper function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // initial details
  useEffect(() => {
    if (params?.slug) getBlog();
  }, [params?.slug]);

  // GET BLOG DETAILS
  const getBlog = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-blog/${params.slug}`);
      setBlog(data?.blog);

      // Fetch related blogs based on blog ID and category ID
      if (data?.blog?._id && data?.blog?.category) {
        getRelatedBlogs(data?.blog?._id, data?.blog?.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET RELATED BLOGS
  const getRelatedBlogs = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/related-blog/${pid}/${cid}`);
      if (data?.success) {
        setRelatedBlogs(data?.blogs);
      }
    } catch (error) {
      console.log('Error fetching related blogs', error);
    }
  };

  // GET ALL BLOGS FOR RECOMMENDED BLOGS
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-blog`);
      if (data?.success) {
        // Shuffle the blogs array randomly
        const shuffledBlogs = data?.blogs.sort(() => 0.5 - Math.random());

        // Select only the first 3 blogs after shuffling
        const selectedBlogs = shuffledBlogs.slice(0, 3);

        setAllBlog(selectedBlogs);
      }
    } catch (error) {
      console.error('Internal server error!', error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // Helper function to shorten description
  const getShortDescription = (description) => {
    if (!description) return ''; // Ensure description exists
    const words = description.split(' ');
    if (words.length > 100) {
      return words.slice(0, 100).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className='flex justify-center items-center'>
      <div className="min-h-screen lg:w-4/5 p-2">
        {/* Main Content */}
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Main Blog Content */}
          <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-md">
            {/* Image or Video */}
            <div className="mb-6">
              <img
                className="w-full h-64 object-contain rounded-md"
                src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${blog._id}`}
                alt="Blog Post"
              />
            </div>

            {/* Title, Author, and Description */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>by {blog.author}</p>
                <p>Published: {formatDate(blog.publishDate)}</p>
              </div>

              {/* Blog Description */}
              <div className="mt-4 text-lg leading-7">
                {isExpanded ? (
                  // Render the full description as HTML
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.description }} // Use dangerouslySetInnerHTML for proper HTML rendering
                    style={{ whiteSpace: 'pre-wrap' }} // Keep the formatting of the content
                  />
                ) : (
                  <>
                    {/* Render the shortened description */}
                    <div
                      dangerouslySetInnerHTML={{ __html: getShortDescription(blog.description) }}
                      style={{ whiteSpace: 'pre-wrap' }}
                    />
                    {blog.description?.split(' ').length > 100 && (
                      <button onClick={() => setIsExpanded(true)} className="text-blue-500 mt-2">
                        Continue Reading...
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Horizontal rule */}
            <hr className="my-6 border-gray-300" />

            {/* Recommended Blogs */}
            <h2 className="text-2xl font-semibold mt-10 mb-4">Recommended Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allblog.map((b) => (
                <Link to={`/blog/${b.slug}`} key={b._id}>
                  <div className="bg-white p-4 rounded-md transition-transform transform hover:scale-105">
                    <img
                      className="w-full h-32 object-cover rounded-md mb-4"
                      src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${b._id}`}
                      alt={b.title}
                    />
                    <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side: Related Blogs */}
          <div className="space-y-6">
            {/* Related Blogs */}
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Related Blogs</h2>
              {relatedBlogs.length ? (
                relatedBlogs.map((blog, index) => (
                  <Link to={`/blog/${blog.slug}`} key={index}>
                    <div className="flex items-center mb-4 transition-transform transform hover:scale-105">
                      <img
                        className="w-20 h-20 object-cover rounded-md mr-4"
                        src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${blog._id}`}
                        alt={blog.title}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{blog.title.substring(0,50) + "..."}</h3>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(blog.publishDate)}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No related blogs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
