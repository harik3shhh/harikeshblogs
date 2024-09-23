import React, { useState, useEffect } from 'react';
import { WiCloud } from 'react-icons/wi'; // Using react-icons for weather

const Weather = () => {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const hours = time.getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 16) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update time every minute

    return () => clearInterval(timer);
  }, [time]);

  // Formatting date
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };

  return (
    <div className='m-4'>
    <div className='lg:w-4/5 mx-auto'>
    <div className=" text-black p-4 gap-2 flex justify-between items-center rounded-md w-full max-w-full">
      {/* Left side: Greeting and Date */}
      <div className="flex flex-col justify-center">
        <h1 className="text-xl lg:text-2xl font-semibold">{greeting}</h1>
        <p className="mt-1 text-sm lg:text-md">{formatDate(time)}</p>
      </div>

      {/* Right side: Weather card */}
      <div className="bg-white text-gray-900 p-2 rounded-lg shadow-lg flex items-center justify-between w-44 lg:w-56">
        <div className="flex items-center">
          {/* Weather Icon */}
          <WiCloud className="text-4xl text-blue-500" />
          <div className="ml-2">
            <p className="text-xs font-medium">Pune, MH</p>
            <p className="text-sm font-bold">Cloudy</p>
          </div>
        </div>
        <p className="text-lg lg:text-2xl font-semibold ml-4">30°C</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Weather;
