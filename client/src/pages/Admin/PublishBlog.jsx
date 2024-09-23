import React, { useState } from 'react';
import { AiOutlinePicture, AiOutlineLink, AiOutlineFileText } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';

const PublishBlog = () => {
    const [widgetPopup, setWidgetPopup] = useState(false);
    const [widgetItems, setWidgetItems] = useState([]);
    const [formData, setFormData] = useState({
        image: '',
        caption: '',
        title: '',
        description: '',
        author: '',
    });

    // Handle form input changes
    const handleInputChange = (e, index = null) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData({ ...formData, image: files[0] }); // Store the file for upload
        } else if (index !== null) {
            // If it's a widget, update widget data
            const updatedWidgets = [...widgetItems];

            if (name === 'widgetImage') {
                updatedWidgets[index].image = files[0]; // Store the widget image file
            } else {
                updatedWidgets[index].content = value;
            }

            setWidgetItems(updatedWidgets);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Toggle widget popup
    const toggleWidgetPopup = () => {
        setWidgetPopup(!widgetPopup);
    };

    // Add widget item to the list
    const addWidgetItem = (type) => {
        const newItem = { type, content: '', image: '' };
        setWidgetItems([...widgetItems, newItem]);
        setWidgetPopup(false); // Close popup after selection
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Create FormData object to send all data including images
        const data = new FormData();
        data.append('image', formData.image);
        data.append('caption', formData.caption);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('author', formData.author);
        
        // Append widget items to FormData
        widgetItems.forEach((widget, index) => {
            if (widget.type === 'image' && widget.image) {
                data.append(`widgetImage_${index}`, widget.image);
            } else {
                data.append(`widgetContent_${index}`, widget.content);
                data.append(`widgetType_${index}`, widget.type);
            }
        });

        try {
            const response = await fetch('http://localhost:8000/api/v1/blog/create-blog', {
                method: 'POST',
                body: data,
            });
            const result = await response.json();
            if (response.ok) {
                // Handle successful blog creation (e.g., show a success message, redirect, etc.)
                console.log('Blog created successfully:', result);
            } else {
                // Handle error case
                console.error('Error creating blog:', result);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl mt-6 font-bold text-center mb-8 text-gray-800 dark:text-white">
                Create and Publish Your Blog
            </h1>
            <div className='flex justify-center items-center'>
                <div className="md:w-full p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:pr-8">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 space-y-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 p-3"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Image Caption
                                </label>
                                <input
                                    type="text"
                                    name="caption"
                                    value={formData.caption}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter image caption"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Blog Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter blog description"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter author name"
                                />
                            </div>

                            <div className="space-y-6">
                                {widgetItems.map((widget, index) => (
                                    <div key={index} className="mb-6">
                                        {widget.type === 'image' && (
                                            <div>
                                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                    Widget Image Upload
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                    onChange={(e) => handleInputChange(e, index)}
                                                    name="widgetImage" // Add name to distinguish it
                                                />
                                            </div>
                                        )}
                                        {widget.type === 'description' && (
                                            <div>
                                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                    Widget Description
                                                </label>
                                                <textarea
                                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                    placeholder="Enter description"
                                                    rows="2"
                                                    onChange={(e) => handleInputChange(e, index)}
                                                ></textarea>
                                            </div>
                                        )}
                                        {widget.type === 'link' && (
                                            <div>
                                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                    Widget Link
                                                </label>
                                                <input
                                                    type="text"
                                                    className="block w-full px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                    placeholder="Enter link"
                                                    onChange={(e) => handleInputChange(e, index)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md">
                                Publish
                            </button>
                        </form>

                        <div
                            className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg z-50"
                            onClick={toggleWidgetPopup}
                        >
                            <FiPlus className="text-3xl" />
                        </div>

                        <AnimatePresence>
                            {widgetPopup && (
                                <motion.div
                                    className="fixed bottom-32 right-12 flex flex-col items-center space-y-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                                        <h2 className="text-lg font-semibold mb-2">Add Widget</h2>
                                        <button className="block bg-gray-300 hover:bg-gray-400 text-black font-semibold p-2 rounded mb-2" onClick={() => addWidgetItem('image')}>
                                            <AiOutlinePicture className="inline-block mr-2" /> Image
                                        </button>
                                        <button className="block bg-gray-300 hover:bg-gray-400 text-black font-semibold p-2 rounded mb-2" onClick={() => addWidgetItem('description')}>
                                            <AiOutlineFileText className="inline-block mr-2" /> Description
                                        </button>
                                        <button className="block bg-gray-300 hover:bg-gray-400 text-black font-semibold p-2 rounded" onClick={() => addWidgetItem('link')}>
                                            <AiOutlineLink className="inline-block mr-2" /> Link
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PublishBlog;
