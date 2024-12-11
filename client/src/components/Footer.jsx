import React, { useContext } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';


const Footer = () => {
  const {theme} = useContext(ThemeContext);

  return (
    
    <footer className={`${theme==="dark"?"bg-[#1f1e1e]":"bg-gray-900"} text-white py-12`}>
      <div className="container w-4/5 mx-auto px-6 lg:px-16">
        {/* Top Section: Social Media and Brand Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
          {/* Brand Section */}
          <div className=" mb-6 md:mb-0">
            <span className="text-3xl font-bold text-yellow-500">BLOGS</span>
          </div>

          {/* Social Media Section */}
          <div className="flex items-center space-x-6">
            <span className="text-lg">Follow Us On </span>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-yellow-500 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-yellow-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#blog" className="hover:text-yellow-500 transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-yellow-500 transition-colors">FAQs</a></li>
              <li><a href="#support" className="hover:text-yellow-500 transition-colors">Support</a></li>
              <li><a href="#terms" className="hover:text-yellow-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:contact@blogs.com" className="hover:text-yellow-500">contact@blogs.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-yellow-500">+123 456 7890</a></li>
              <li>Address: 123, Blog Street, Web City</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get the latest updates.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} BLOGS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;