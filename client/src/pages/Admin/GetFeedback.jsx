import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

const GetFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  const getFeedback = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/get-feedback`);
      if (data?.success) {
        // Sort feedback by createdAt in descending order (latest first)
        const sortedFeedback = data.feedback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeedback(sortedFeedback);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Internal Server Error!`);
    }
  };

  // Helper function to format date according to IST
  const formatISTDate = (dateString) => {
    const options = { 
      timeZone: 'Asia/Kolkata', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', options);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <h1 className="text-3xl font-extrabold text-indigo-500 text-center  p-4 rounded-lg shadow-lg  mb-8">FEEDBACK</h1>

        {/* Feedback cards container */}
        <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Card Content */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.email}</p>
              </div>
              <div>
                <p className="text-gray-700">{item.message}</p>
              </div>
              {/* Formatted Date and Time */}
              <p className="text-blue-500 font-medium mt-4">
                {formatISTDate(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GetFeedback;
