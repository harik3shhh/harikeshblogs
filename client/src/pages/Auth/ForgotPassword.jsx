import React, { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const ForgotPassword = () => {

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-[#232323] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-6 py-8 shadow-md rounded-lg relative'>
        <Link to="/" className='absolute top-4 right-4 text-white hover:text-blue-500 text-2xl'>
          <FaHome />
        </Link>
        <h1 className='text-white text-2xl mb-4 font-crimson'>FORGOT PASSWORD</h1>
        <p className='text-sm mb-6 text-white'>Enter your email address used during registration</p>
        <div className='mb-6'>
          <input className='p-2 outline-none rounded-md w-full' type="email" placeholder='email@example.com' />
        </div>

        <div className='mb-6'>
          <input className='p-2 outline-none rounded-md w-full' type="text" placeholder='what is your favourite thing ?' />
        </div>

        <button className='text-white bg-blue-600 p-2 rounded-xl w-full'>SUBMIT</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
