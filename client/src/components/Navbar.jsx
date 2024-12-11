import React, { useContext, useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose, IoMdMoon } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsChevronDown, BsChevronUp, BsSun } from "react-icons/bs"; // Added BsChevronUp for the expanded state
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import { useAuth } from '../context/auth';
import {toast} from "react-toastify"
import { ThemeContext } from '../context/ThemeContext';



const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const { theme, handleToggleTheme } = useContext(ThemeContext);




  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsProfileOpen(false); // Close profile menu when hamburger menu is toggled
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  //o LOGOUT USER
  const handleLogout = () => { 
    setAuth({
      ...auth,
      user: null,
      token: ""
    });

    localStorage.removeItem("auth");
    toast.success("Logout Successful !");

  }

  return (
    <>
    <nav className={`${theme==="dark"? "bg-black":"bg-white"}  shadow-md rounded-md sticky top-0 z-50`}>
    
      <div className="container lg:w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className={`${theme==="dark"?"text-white":"text-black"} text-3xl font-bold font-crimsonpro`}>BLOGS</NavLink>
          </div>

          {/* Hamburger Icon: Visible on md and below */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <IoMdClose className="block h-6 w-6" /> : <CiMenuBurger className="block h-6 w-6" />}
            </button>
          </div>

          {/* Tabs: Hidden on medium screens and below */}
          <div className={` hidden lg:flex space-x-8 text-xl`}>
            <NavLink to="/" className={`${theme==="dark"?"text-white":"text-black"} font-crimsonpro hover:text-blue-900`}>HOME</NavLink>

            <NavLink to="/about" className={`${theme==="dark"?"text-white":"text-black"} font-crimsonpro hover:text-blue-900`}>ABOUT</NavLink>

            <NavLink to="/blogshub" className={`${theme==="dark"?"text-white":"text-black"} font-crimsonpro hover:text-blue-900`}>ALL-BLOGS</NavLink>


            <NavLink to="/travel-blogs" className={`${theme==="dark"?"text-white":"text-black"} font-crimsonpro hover:text-blue-900`}>TRAVEL BLOGS</NavLink>
            <NavLink to="/feedback" className={`${theme==="dark"?"text-white":"text-black"} font-crimsonpro hover:text-blue-900`}>FEEDBACK</NavLink>
          </div>

          {/* Profile Menu and Icons: Hidden on medium screens and below */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className={`${theme==="dark"?"text-white":"text-black"} inline-flex items-center justify-center p-2 rounded-md focus:outline-none`}
              >
                <CgProfile size={30} className="mr-1" />
                <span className={`${theme==="dark"?"text-white":"text-black"}`}>{!auth?.user ? "GUEST" : auth?.user.name} </span>
                {isProfileOpen ? <BsChevronUp className="ml-1" /> : <BsChevronDown className="ml-1" />}
              </button>
              <div
                className={`origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform ${
                  isProfileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                <div className="py-1">
                  
                  <NavLink to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Profile</NavLink>

                  <NavLink to="/admin-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Admin Dashboard</NavLink>
                  <NavLink to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Settings</NavLink>

                  {!auth?.user ? (<>
                  <NavLink to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Login</NavLink>
                  <NavLink to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Sign up</NavLink>
                  </>) : (
                  <NavLink to={"/"} onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Logout</NavLink>
                  )}
                </div>
              </div>
            </div>
            {/* Social Icons */}
            
            <button
            onClick={handleToggleTheme}
            className={({ isActive }) => isActive ? "text-blue-500" : "hover:text-blue-500 text-white cursor-pointer"}
          >
            {theme === "dark" ? <BsSun className='text-yellow-400' size={25} /> : <IoMdMoon size={25} />}
          </button>


            <NavLink to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <FaInstagram size={30} className="w-6 h-6 text-pink-700 hover:text-pink-500" />
            </NavLink>
            <NavLink to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <FaTwitter size={30} className="w-6 h-6 text-blue-500 hover:text-blue-400" />
            </NavLink>
            <NavLink to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <FaFacebook size={30} className="w-6 h-6 text-blue-700 hover:text-blue-500" />
            </NavLink>
            <NavLink to="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <FaYoutube size={30} className="w-6 h-6 text-red-700 hover:text-red-500" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div className={`px-2 pt-2 pb-3 sm:px-3 ${isOpen ? 'block' : 'hidden'} lg:hidden`}>
        <NavLink to="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">HOME</NavLink>
        <NavLink to="/about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">ABOUT</NavLink>
        
        <NavLink to="/blogshubz" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">ALL-BLOGS</NavLink>

        <NavLink to="/travel-blogs" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">TRAVEL BLOGS</NavLink>
        <NavLink to="/feedback" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">FEEDBACK</NavLink>
        {/* Mobile Single Dropdown Profile Menu */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center justify-between px-3 py-2 text-gray-700 hover:text-gray-900 w-full text-left"
          >
            <span className="text-gray-700">{!auth?.user ? "GUEST" : auth?.user.name}</span>
            {isProfileOpen ? <BsChevronUp className="ml-1" /> : <BsChevronDown className="ml-1" />}
          </button>
          {isProfileOpen && (
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50`}>
              <div className="bg-white rounded-md shadow-md p-4 max-w-xs w-full">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{""}</span>
                  <button className="text-gray-600 hover:text-gray-900 focus:outline-none" onClick={toggleProfileMenu}>
                    <AiOutlineClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="py-1">
                  <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Profile</NavLink>
                  

                  <NavLink to="/admin-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Dashboard</NavLink>


                  <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Settings</NavLink>

                  {!auth?.token ? (<>
                  <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Login</NavLink>
                  <NavLink to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Sign up</NavLink>
                  </>):(
                  
                  <NavLink to={"/"} onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Logout</NavLink>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    
      {/* End Mobile/Tablet Menu */}
    </nav>
    </>
  );
};

export default Navbar;
