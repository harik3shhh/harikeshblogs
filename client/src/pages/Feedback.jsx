import React, { useState } from 'react';
import Layout from '../components/Layout';
import {toast}  from "react-toastify";
import axios from "axios"

const Feedback = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name] :value
    });
  };


  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const {data}  = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/feedback`, input);
      if(data.success){
        setInput({name: "", email:"", message: ""});
        toast.success("Feedback sent success!");
      }else{
        toast.error("Faild to send feedback!")
      }
      
    } catch (error) {
      console.log(error);

      
    }
  }

  return (
    <Layout title='FEEDBACK - blogs rated with 5 stars'>
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-lg w-full bg-white shadow-2xl rounded-3xl p-10 space-y-6 z-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-indigo-700">
              We Value Your Feedback
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Help us improve by sharing your thoughts. Your feedback is very important to us!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="Enter your name"
                  value={input.name}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="Enter your email"
                  value={input.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="message"
                  rows="4"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  placeholder="Write your feedback"
                  value={input.message} 
                  onChange={handleInput}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
