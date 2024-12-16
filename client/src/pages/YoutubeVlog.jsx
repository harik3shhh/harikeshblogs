import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Layout from '../components/Layout';
import axios from 'axios';
import { Link, NavLink } from "react-router-dom"
import { ThemeContext } from '../context/ThemeContext';


const YoutubeVlog = () => {
  const {theme} = useContext(ThemeContext);
  const [youtube, setYoutube] = useState([]);

  const getYoutubeVlog = async() =>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-yt-vlog`);
      if(data?.success){
    
        setYoutube(data?.vlog)
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() =>{
    getYoutubeVlog();
  }, []);




  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = startX - endX;

    if (difference > 50) {
      handleNext();
    } else if (difference < -50) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setCurrentBlogIndex((prevIndex) =>
      prevIndex === youtube.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentBlogIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <Layout>
    <div className="py-8 flex flex-col items-center">
      {/* Title */}

      {/* Carousel Container with reduced width */}
      <div
        className="relative w-3/4 max-w-5xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
      <h1 className={`${theme==="dark"?"text-white":"text-gray-800"} text-3xl font-bold mb-4`}>Travel Vlogs - watch on <span className='text-red-600'> YouTube </span> </h1>
        {/* Carousel Slide */}
        <div className="relative flex overflow-hidden rounded-lg shadow-lg">
          {youtube.map((blog) => (
            
            <div
              key={blog._id}
              className={`flex-none w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${
                blog._id === currentBlogIndex ? '' : 'opacity-90'
              }`}
              
              style={{
                transform: `translateX(-${currentBlogIndex * 100}%)`,
              }}
            >
              <NavLink to={`${blog?.link}` } target='_blank' rel="noopener noreferrer">
              <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-lg h-[300px] lg:h-[250px]">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/vlog-photo/${blog._id}`}
                  alt={blog.title}
                  className="lg:w-1/2 w-full h-full object-cover"
                />
                <div className="p-4 flex flex-col justify-center lg:w-1/2">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.desc}</p>
                </div>
              </div>
              </NavLink>
            </div>
            
          ))}
        </div>

        {/* Arrow Buttons Outside the Cards */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300 focus:outline-none"
          style={{ visibility: currentBlogIndex === 0 ? 'hidden' : 'visible' }}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300 focus:outline-none"
          style={{ visibility: currentBlogIndex === youtube.length - 1 ? 'hidden' : 'visible' }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default YoutubeVlog;
