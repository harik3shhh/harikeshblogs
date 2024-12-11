import React from 'react';
import Weather from '../UI/Weather';
import Banner from '../UI/Banner';
import Stories from '../UI/Stories';
import HomeBlogs from '../UI/HomeBlogs';
import TechBlogSlide from '../UI/TechBlogSlide';
import TravelBlogSlide from '../UI/TravelBlogSlide';
import YoutubeVlog from './youtubeVlog';


const Home = () => {
  return (
    <>
      <Weather />
      {/* <Stories/> */}
      <Banner />
      <HomeBlogs />
      <YoutubeVlog />
      <TechBlogSlide/>
      <TravelBlogSlide/>
    </>
  );
};

export default Home;
