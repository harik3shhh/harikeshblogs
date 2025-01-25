import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import CountUp from 'react-countup';
import { FaBlog, FaProjectDiagram, FaUsers, FaComments } from 'react-icons/fa';

const Statistics = () => {
  const [stats, setStats] = useState([
    { count: 0, label: 'Blogs', border: 'border-blue-500', color: 'text-blue-500', icon: <FaBlog size={40} /> },
    { count: 0, label: 'Projects', border: 'border-green-500', color: 'text-green-500', icon: <FaProjectDiagram size={40} /> },
    { count: 0, label: 'Users', border: 'border-yellow-500', color: 'text-yellow-500', icon: <FaUsers size={40} /> },
    { count: 0, label: 'Feedbacks', border: 'border-red-500', color: 'text-red-500', icon: <FaComments size={40} /> },
  ]);

  const fetchStatistics = async () => {
    try {
      const [blogRes, userRes, feedbackRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-count`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user-count`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/feedback-count`),
      ]);

      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.label === 'Blogs') return { ...stat, count: blogRes.data?.total || 0 };
          if (stat.label === 'Users') return { ...stat, count: userRes.data?.totalUser || 0 };
          if (stat.label === 'Feedbacks') return { ...stat, count: feedbackRes.data?.totalFeedback || 0 };
          return stat;
        })
      );
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-8">
        {/* Dashboard Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Dashboard <span className="text-indigo-600">Statistics</span>
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg border-2 ${stat.border} flex flex-col items-center p-6 transform transition-transform hover:scale-105`}
            >
              {/* Icon */}
              <div className={`mb-4 p-4 rounded-full border-2 ${stat.border} ${stat.color}`}>
                {stat.icon}
              </div>
              {/* Count */}
              <h2 className={`text-5xl font-extrabold ${stat.color}`}>
                <CountUp start={0} end={stat.count} duration={2.5} separator="," />
              </h2>
              {/* Label */}
              <p className={`mt-3 text-xl font-medium uppercase ${stat.color}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
