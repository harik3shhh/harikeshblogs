import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollTop';
import Details from './pages/Details';
import PageNotFound from './components/PageNotFound';
import Register from './pages/Auth/Register';

import PublishBlog from './pages/Admin/PublishBlog';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';




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

        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/publish-blog' element={<PublishBlog />} />

        

        <Route path='/blog-details' element={<Details />} />
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
