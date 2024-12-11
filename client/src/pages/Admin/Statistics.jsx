import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import CountUp from 'react-countup';

const Statistics = () => {
  const [stats, setStats] = useState([
    { count: 0, label: 'Blogs', color: 'bg-blue-500' },
    { count: 0, label: 'Projects', color: 'bg-green-500' },
    { count: 0, label: 'Users', color: 'bg-yellow-500' },
    { count: 0, label: 'Feedbacks', color: 'bg-red-500' },
  ]);

  const getBlogCount = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-count`);
      if (data?.success) {
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.label === 'Blogs' ? { ...stat, count: data?.total } : stat
          )
        );
      }
    } catch (error) {
      console.error('Error fetching blog count:', error);
    }
  };

  const getUserCount = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user-count`);
      if (data?.success) {
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.label === 'Users' ? { ...stat, count: data?.totalUser } : stat
          )
        );
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const getFeedbackCount = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/feedback-count`);
      if (data?.success) {
        setStats((prevStats) =>
          prevStats.map((stat) =>
            stat.label === 'Feedbacks' ? { ...stat, count: data?.totalFeedback } : stat
          )
        );
      }
    } catch (error) {
      console.error('Error fetching feedback count:', error);
    }
  };

  useEffect(() => {
    getBlogCount();
    getUserCount();
    getFeedbackCount();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-8">
        <h1 className="shadow-lg p-4 rounded-lg text-indigo-500 text-center text-4xl font-extrabold mb-10 text-gray-800">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl ${stat.color} text-white flex flex-col items-center justify-center p-8 shadow-lg transform transition-transform hover:scale-105`}
            >
              <h2 className="text-5xl font-bold">
                <CountUp start={0} end={stat.count} duration={2.5} separator="," />
              </h2>
              <p className="mt-4 text-lg font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
