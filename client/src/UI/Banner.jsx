import React from 'react';
import vlog from '../assets/vlog.png';
import Layout from '../components/Layout';
import chess from '../assets/chess.jpg'
import { Link } from 'react-router-dom';


const Banner = () => {
  return (
    <>
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full flex flex-wrap lg:flex-nowrap m-4 gap-4">
          {/* Carousel for 80% of the page on larger screens, full width on smaller screens */}
          <div className="w-full lg:w-4/5 h-72 lg:h-96">
            <div className="relative h-full rounded-lg shadow-lg overflow-hidden">
              <img
                src={vlog}
                alt="Banner"
                className="object-fill h-full w-full"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                <h1 className="text-2xl font-bold">Read what matters!!!</h1>
                <p className="text-sm">Explore amazing destinations and travel tips!</p>
              </div>
            </div>
          </div>

          {/* Sidebar for 20% on larger screens, full width stacking on smaller screens */}
          <div className="w-full lg:w-[20%] mt-2 flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:flex lg:flex-col">
            {/* Sidebar Block 1 */}
            <Link to="https://www.youtube.com"  target='_blank'><div className="bg-gray-100 rounded-lg border border-gray-500 h-44 flex flex-col justify-between mb-4 md:mb-0">  
              <img src={chess} alt="chess image" className='w-full h-full object-cover rounded-lg cursor-pointer'/>
            </div>
            </Link>
            {/* Sidebar Block 2 */}
            <div className="bg-gray-100 rounded-lg p-4 shadow-lg h-44 flex flex-col justify-between">
              {/* You can add content or images here */}
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default Banner;
