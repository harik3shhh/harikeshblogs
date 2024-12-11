import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from "axios";
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons
import Layout from '../../components/Layout';
import { ThemeContext } from '../../context/ThemeContext';


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null); // New state for password match
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)


  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
   
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;


    if (name === 'password' || name === 'cpassword') {
      setPasswordMatch(input.password === value || input.cpassword === value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to check if any field is empty
    if (!input.name || !input.email || !input.phone || !input.password || !input.cpassword) {
      toast.error("Please fill in all the fields.");
      return;
    }

    // Check if passwords match
    if (input.password !== input.cpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, input);
      if (data?.success) {
        setInput({ name: "", email: "", phone: "", password: "", cpassword: "", answer: "" });
        toast.success("Registration Successful!");
        navigate("/login");
      } else {
        toast.error(data?.message || "Registration Failed!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Layout>
      <div
        className={`flex justify-center items-center m-4 min-h-screen rounded-lg`}>
        <div className={` rounded-lg shadow-2xl p-6 lg:p-8 w-full max-w-md`}>
          <h2 className={`${theme==="dark"?"text-white":"text-black"} text-2xl font-bold font-crimson mb-6 text-center `}>REGISTRATION</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name="name"
              placeholder='Name'
              value={input.name}
              onChange={handleInput}
              className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />
            <input
              type='email'
              name="email"
              placeholder='example@gmail.com'
              value={input.email}
              onChange={handleInput}
              className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />
            <input
              type='phone'
              name="phone"
              placeholder='(+91) 999-222-2345'
              value={input.phone}
              onChange={handleInput}
              className='w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />

            <div className='relative mb-2'>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder='Password'
                value={input.password}
                onChange={handleInput}
                className='w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 pr-3 flex items-center justify-end font-bold'
                style={{ bottom: '8px' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>


            <div className='relative mb-2'>
              <input
                name='cpassword'
                type="password"
                placeholder='Confirm Password'
                value={input.cpassword}
                onChange={handleInput}
                className='w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
              />
            </div>
            {input.cpassword && (
              <div className='flex items-center justify-center mb-4'>
                {passwordMatch ? (
                  <div className='flex items-center text-green-500'>
                    <FaCheckCircle className='mr-2' />
                    <p>Passwords match</p>
                  </div>
                ) : (
                  <div className='flex items-center text-red-500'>
                    <FaTimesCircle className='mr-2' />
                    <p>Passwords do not match</p>
                  </div>
                )}
              </div>
            )}


            <button
              type='submit'
              className='w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'
            >
              Sign Up
            </button>
          </form>
          <p className={`text-center ${theme==="dark"?"text-white":"text-black"}`}>
            Already have an account? <NavLink to='/login' className='text-blue-600 hover:text-blue-500'>Sign in</NavLink>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
