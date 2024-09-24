import React from 'react';
import TravelBlog from './TravelBlog';
import Weather from '../UI/Weather';
import Banner from '../UI/Banner';
import Stories from '../UI/Stories';
import HomeBlogs from '../UI/HomeBlogs';


const Home = () => {
  return (
    <>
      <Weather />
      {/* <Stories/> */}
      <Banner />


      <HomeBlogs />

      <TravelBlog />
    </>
  );
};

export default Home;
