import React from 'react'
import Layout from '../../components/Layout';

const Statistics = () => {
  const stats = [
    { count: 25, label: 'Blogs', color: 'bg-blue-500' },
    { count: 15, label: 'Projects', color: 'bg-green-500' },
    { count: 45, label: 'Users', color: 'bg-yellow-500' },
    { count: 10, label: 'Sales', color: 'bg-red-500' },
  ];

  return (
    <Layout>
    <div className='min-h-screen'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`rounded-lg ${stat.color} text-white flex flex-col items-center justify-center p-6 shadow-md`}
        >
          <h2 className="text-4xl font-bold">{stat.count}</h2>
          <p className="mt-2 text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
    </div>
    </Layout>
  );
}

export default Statistics;
