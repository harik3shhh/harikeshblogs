import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import tourindia from "../assets/tourindia.jpg"

const HomeBlogs = () => {
  return (
    <>
        <Layout>
        <div className="bg-gray-50  min-h-screen py-8 flex justify-center">
          <div className="w-full  rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to Our Blog</h1>
            <p className="text-center text-gray-600 mb-8">
              Stay updated with the latest news, tips, and insights from our blogs.
            </p>

            {/* Dummy Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Blog Post 1 */}
              <Link to="/blog-details">
                <div className="bg-white rounded-lg transition-shadow duration-300">
                  <img
                    className="rounded-t-lg h-48 w-full object-cover"
                    src={tourindia}
                    alt="Blog 1"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2"> प्राकृतिक सुंदरता के रंग: भारत के सर्वश्रेष्ठ पर्वतीय स्थान </h2>
                    <p className="text-gray-600 mb-4">
                      Learn the essentials of creating a successful blog and sharing your thoughts with the world.
                    </p>
                    <a href="#blog1" className="text-blue-500 hover:underline">Read More</a>
                  </div>
                </div>
              </Link>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-lg  transition-shadow duration-300">
                <img
                  className="rounded-t-lg h-48 w-full object-cover"
                  src="https://via.placeholder.com/350x150"
                  alt="Blog 2"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">iPhone 15 सीरीज: नई तकनीक और शानदार फीचर्स</h2>
                  <p className="text-gray-600 mb-4">{`
                Apple ने हाल ही में iPhone 15 सीरीज लॉन्च की है, जिसमें नई तकनीक और फीचर्स का उपयोग किया गया है। इस सीरीज में बेहतर कैमरा, नई चिप, और डिस्प्ले क्वालिटी का उल्लेखनीय सुधार किया गया है। आइए जानें कि इस नए iPhone सीरीज में क्या खास है।`.substring(0, 100) + "..."}
                  </p>
                  <a href="#blog2" className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-lg  transition-shadow duration-300">
                <img
                  className="rounded-t-lg h-48 w-full object-cover"
                  src="https://via.placeholder.com/350x150"
                  alt="Blog 3"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">How to Monetize Your Blog</h2>
                  <p className="text-gray-600 mb-4">
                    Discover how you can turn your blog into a source of passive income with these monetization strategies.
                  </p>
                  <a href="#blog3" className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>

              {/* Blog Post 4 */}
              <div className="bg-white rounded-lg  transition-shadow duration-300">
                <img
                  className="rounded-t-lg h-48 w-full object-cover"
                  src="https://via.placeholder.com/350x150"
                  alt="Blog 4"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">The Future of Blogging: Trends to Watch</h2>
                  <p className="text-gray-600 mb-4">
                    Stay ahead of the curve with these future blogging trends and how they’ll impact content creation.
                  </p>
                  <a href="#blog4" className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default HomeBlogs