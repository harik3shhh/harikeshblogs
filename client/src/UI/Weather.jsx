import React, { useState, useEffect, useContext } from 'react';
import { WiCloud } from 'react-icons/wi'; // Using react-icons for weather
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

const Weather = () => {
  const { theme } = useContext(ThemeContext);
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState("Pune");
  const [temperature, setTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_WEATHER = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18b13841a6bb6e092f2a5677e6aa18b0`;
        const { data } = await axios.get(API_WEATHER);
        setCity(data.name);
        setTemperature((data.main.temp - 273.15).toFixed(2)); // Convert from Kelvin to Celsius
        setWeatherDescription(data.weather[0].description);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city]);

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
        <div className="text-black p-4 gap-2 flex justify-between items-center rounded-md w-full max-w-full">
          {/* Left side: Greeting and Date */}
          <div className="flex flex-col justify-center">
            <h1 className={`${theme === "dark" ? "text-white" : "text-black"} text-xl lg:text-2xl font-semibold`}>{greeting}</h1>
            <p className={`${theme === "dark" ? "text-white" : "text-black"} mt-1 text-sm lg:text-md`}>{formatDate(time)}</p>
          </div>

          {/* Right side: Weather card */}
          <div className="bg-white text-gray-900 p-2 rounded-lg shadow-lg flex items-center justify-between w-44 lg:w-56">
            <div className="flex items-center">
              {/* Weather Icon */}
              <WiCloud className="text-4xl text-blue-500" />
              <div className="ml-2">
                <p className="text-xs font-medium">{city}</p>
                <p className="text-sm font-bold capitalize">{weatherDescription}</p>
              </div>
            </div>
            <p className="sm:ml-4 text-lg lg:text-2xl font-semibold ml-4">{temperature ? `${temperature}°C` : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
