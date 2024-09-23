import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TravelBlog = () => {
  // Sample travel blogs
  const blogs = [
    {
      title: 'Exploring the Alps',
      description: 'Discover the stunning beauty of the Swiss Alps and its magnificent snow-capped peaks.',
      image: 'https://via.placeholder.com/800x400?text=Alps+Travel+Blog',
    },
    {
      title: 'A Journey Through the Sahara Desert',
      description: 'Experience the vastness of the Sahara Desert with its endless sand dunes and starry nights.',
      image: 'https://via.placeholder.com/800x400?text=Sahara+Desert+Blog',
    },
    {
      title: 'Adventures in Bali',
      description: 'Explore the tropical paradise of Bali, famous for its pristine beaches and lush landscapes.',
      image: 'https://via.placeholder.com/800x400?text=Bali+Travel+Blog',
    },
    {
      title: 'Discovering the Amazon Rainforest',
      description: 'Embark on an adventure into the Amazon Rainforest, the largest tropical rainforest in the world.',
      image: 'https://via.placeholder.com/800x400?text=Amazon+Rainforest+Blog',
    },
  ];

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
      prevIndex === blogs.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentBlogIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <div className="bg-white py-8 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Travel Vlogs</h1>

      {/* Carousel Container with reduced width */}
      <div
        className="relative w-3/4 max-w-5xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Slide */}
        <div className="relative flex overflow-hidden rounded-lg shadow-lg">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={`flex-none w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${
                index === currentBlogIndex ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                transform: `translateX(-${currentBlogIndex * 100}%)`,
              }}
            >
              <div className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-lg h-[300px] lg:h-[250px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="lg:w-1/2 w-full h-full object-cover"
                />
                <div className="p-4 flex flex-col justify-center lg:w-1/2">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{blog.description}</p>
                </div>
              </div>
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
          style={{ visibility: currentBlogIndex === blogs.length - 1 ? 'hidden' : 'visible' }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TravelBlog;
