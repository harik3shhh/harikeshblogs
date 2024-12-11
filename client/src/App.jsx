import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import {  Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollTop';
import Details from './pages/Details';
import PageNotFound from './components/PageNotFound';
import Register from './pages/Auth/Register';

import PublishBlog from './pages/Admin/PublishBlog';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import AdminRoute from './routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import AllBlogs from './pages/Admin/AllBlogs';
import GetUser from './pages/Admin/GetUser';
import Feedback from './pages/Feedback';
import ForgotPassword from './pages/Auth/ForgotPassword';
import TravelBlogs from './pages/TravelBlogs';
import UpdateBlog from './pages/Admin/UpdateBlog';
import GetFeedback from './pages/Admin/GetFeedback';
import Statistics from './pages/Admin/Statistics';
import TechBlogs from './pages/TechBlogs';
import CreateBanner from './pages/Admin/CreateBanner';
import CreateYoutubeVlog from './pages/Admin/CreateYoutubeVlog';
import BlogsHub from './pages/BlogsHub';






const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  const location = useLocation();

  const AppComponent = () => (
    <>
      {location.pathname !== '/forgot-password' && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/feedback' element={<Feedback/>} />
        <Route path='/travel-blogs' element={<TravelBlogs/>} />
        <Route path='/tech-blogs' element={<TechBlogs/>} />
        <Route path='/blogshub' element={<BlogsHub/>} />



        <Route path='' element={<AdminRoute />}>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/publish-blog' element={<PublishBlog />} />
        <Route path='/all-blogs' element={<AllBlogs />} />
        <Route path='/users' element={<GetUser />} />
        <Route path='/update-blog/:slug' element={<UpdateBlog />} />
        <Route path='/get-feedback'  element={<GetFeedback/>} />
        <Route path='/statistics' element={<Statistics/>} />
        <Route path='/admin/create-banner' element={<CreateBanner/>} />
        <Route path='/admin/create-yt-vlog' element={<CreateYoutubeVlog/>} />



        </Route>
        

        <Route path='/blog/:slug' element={<Details />} />
              <Route path='*' element={<PageNotFound />} />
      </Routes>

      {location.pathname !== '/forgot-password' && <Footer />}
    </>
  );

  return (
    <div>
      {loading ? <Loading /> : <AppComponent />}
    </div>
  );
};

const AppWrapper = () => (
<>
    <ScrollToTop /> 
    <App />
    </>
);

export default AppWrapper;
