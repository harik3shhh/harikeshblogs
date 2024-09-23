import React, { useState } from 'react';
import tourindia from "../assets/tourindia.jpg"

const Details = () => {
  const recommendedBlogs = [
    { title: 'Recommended blog 1', author: 'John Doe', img: 'https://via.placeholder.com/100', date: 'Sept 10, 2023', description: 'Get to know the basics and advanced features of React.' },
    { title: 'Recommended blog 2', author: 'Jane Smith', img: 'https://via.placeholder.com/100', date: 'Aug 24, 2023', description: 'A beginner’s guide to Node.js and its ecosystem.' },
    { title: 'Recommended blog3', author: 'David Williams', img: 'https://via.placeholder.com/100', date: 'Jul 30, 2023', description: 'Explore the fundamentals of MongoDB for data storage.' },
  ];

  const relatedBlogs = [
    { title: 'भारत की यात्रा: एक अद्भुत अनुभव', img: 'https://via.placeholder.com/150', date: 'Jul 20, 2023' },
    { title: 'गोवा के समुद्र तट:', author: 'Tim Cook', img: 'https://via.placeholder.com/100', date: 'Jul 12, 2023' },
  ];

  const suggestedBlogs = [
    { title: 'Top 5 Gadgets to Watch in 2024: The Future Is Here',  img: 'https://via.placeholder.com/100', date: 'Sept 1, 2023' },
    { title: 'Building REST APIs', author: 'Charlie Black', img: 'https://via.placeholder.com/100', date: 'Aug 28, 2023' },
  ];

  // State to manage the visibility of the full blog description
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='flex justify-center items-center'>
      <div className="min-h-screen lg:w-4/5 bg-gray-100 p-2">
        {/* Main Content */}
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Main Blog Content */}
          <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-md">
            {/* Image or Video */}
            <div className="mb-6">
              <img
                className="w-full h-64 object-cover rounded-md"
                src={tourindia}
                alt="Blog Post"
              />
            </div>

            {/* Title, Author, and Description */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">प्राकृतिक सुंदरता के रंग: भारत के सर्वश्रेष्ठ पर्वतीय स्थान</h1>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>by harikesh</p>
                <p>Published: Sept 21, 2024</p>
              </div>
              <p className="mt-4 text-lg leading-7">
                {isExpanded ? (
                  <>
                    भारत के पर्वतीय स्थानों में प्राकृतिक सुंदरता और शांति का अनूठा संगम है। अगर आप किसी छुट्टी की योजना बना रहे हैं, तो ये पहाड़ी जगहें आपके लिए आदर्श हो सकती हैं।
                    <br />
                    मुख्य आकर्षण:
                    <br />
                    शिमला, हिमाचल प्रदेश
                    <br />
                    मनाली, हिमाचल प्रदेश
                    <br />
                    औली, उत्तराखंड
                    <br />
                    लेह-लद्दाख, जम्मू और कश्मीर
                    <br />
                    दार्जिलिंग, पश्चिम बंगाल
                    <br />
                    इन स्थानों पर आप स्नोफॉल, एडवेंचर स्पोर्ट्स और शांत वातावरण का आनंद ले सकते हैं। ठंडे मौसम और खूबसूरत पहाड़ियों के बीच समय बिताना सुकून भरा अनुभव होता है।
                  </>
                ) : (
                  <>
                    भारत के पर्वतीय स्थानों में प्राकृतिक सुंदरता और शांति का अनूठा संगम है। अगर आप किसी छुट्टी की योजना बना रहे हैं, तो ये पहाड़ी जगहें आपके लिए आदर्श हो सकती हैं।
                    <br />
                    <button onClick={toggleDescription} className="text-blue-500 mt-2">
                      Continue Reading...
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Horizontal rule */}
            <hr className="my-6 border-gray-300" />

            {/* Recommended Blogs */}
            <h2 className="text-2xl font-semibold mt-10 mb-4">Recommended Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedBlogs.map((blog, index) => (
                <div key={index} className="bg-white  p-4 rounded-md transition-transform transform hover:scale-105">
                  <img
                    className="w-full h-32 object-cover rounded-md mb-4"
                    src={blog.img}
                    alt={blog.title}
                  />
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  {/* <p className="text-gray-500 text-sm">by {blog.author}</p> */}
                  {/* <p className="text-gray-400 text-xs mt-1">{blog.date}</p> */}
                  <p className="text-gray-600 mt-2">{blog.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Related & Suggested Blogs */}
          <div className="space-y-6">
            {/* Related Blogs */}
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Related Blogs</h2>
              {relatedBlogs.map((blog, index) => (
                <div key={index} className="flex items-center mb-4 transition-transform transform hover:scale-105">
                  <img
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    src={blog.img}
                    alt={blog.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    {/* <p className="text-sm text-gray-500">by {blog.author}</p> */}
                    <p className="text-xs text-gray-400 mt-1">{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Blogs */}
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-2xl font-semibold mb-4">Suggested Blogs</h2>
              {suggestedBlogs.map((blog, index) => (
                <div key={index} className="flex items-center mb-4 transition-transform transform hover:scale-105">
                  <img
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    src={blog.img}
                    alt={blog.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    {/* <p className="text-sm text-gray-500">by {blog.author}</p> */}
                    <p className="text-xs text-gray-400 mt-1">{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
