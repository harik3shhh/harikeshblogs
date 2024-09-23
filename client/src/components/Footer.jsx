import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-black py-16"> {/* Increased the padding from py-8 to py-10 */}
      <div className="container lg:w-4/5 mx-auto px-4 md:px-32">
        {/* Follow Us and Social Media Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6"> {/* Increased margin-bottom */}
          <div className="flex items-center space-x-6">
            <span className="text-lg ">Follow Us On</span>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-300 my-6" />

        {/* Logo/Company Name, Quick Links, and Copyright */}
        <div className="flex flex-col md:flex-row justify-between mt-4 items-center md:space-x-48">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold">BLOGS</span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-6">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#home" className="hover:text-gray-400">Home</a>
              <a href="#about" className="hover:text-gray-400">About Us</a>
              <a href="#services" className="hover:text-gray-400">Services</a>
              <a href="#contact" className="hover:text-gray-400">Contact Us</a>
            </div>

            {/* Copyright Notice */}
            <div className="text-sm text-gray-600 md:ml-auto">
              &copy; {new Date().getFullYear()} BLOGS. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
