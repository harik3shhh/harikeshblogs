import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const UpdateBlog = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [photo, setPhoto] = useState(null); // Initialize as null
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');

  // Fetch single blog
  const getSingleBlog = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/get-blog/${params.slug}`);
      setTitle(data.blog.title);
      setCaption(data.blog.caption);
      setDescription(data.blog.description);
      setAuthor(data.blog.author);
      setPublishDate(data.blog.publishDate);
      setCategory(data.blog.category._id);
      setId(data.blog._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const blogData = new FormData(); // Use FormData to handle file upload
      blogData.append('category', category);
      blogData.append('title', title);
      blogData.append('caption', caption);
      blogData.append('description', description);
      blogData.append('author', author);
      blogData.append('publishDate', publishDate);
      if (photo) {
        blogData.append('photo', photo); // Add the photo if it exists
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/blog/update-blog/${id}`,
        blogData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure multipart header is set
          },
        }
      );
      if (data?.success) {
        toast.success('Blog Updated Successfully');
        // navigate('/blogs');
      } else {
        toast.error('Failed to Update Blog');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating blog');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Update Blog</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          {/* Category Selector */}
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            className="w-full mb-4"
            onChange={(value) => setCategory(value)}
            value={category}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          {/* Upload Image */}
          <div className="mb-4">
            <label className="block cursor-pointer border border-gray-300 rounded-md p-2">
              {photo ? photo.name : 'Upload Image'}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])} // Set the photo state
                className="hidden"
              />
            </label>
          </div>

          {/* Image Preview */}
          <div className="mb-4 text-center">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                className="h-48 mx-auto"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${id}`}
                alt="Current Blog Image"
                className="h-48 mx-auto"
              />
            )}
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            placeholder="Blog Title"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Caption Input */}
          <input
            type="text"
            value={caption}
            placeholder="Blog Caption"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Description Input */}
          <textarea
            value={description}
            placeholder="Blog Description"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>

          {/* Author Input */}
          <input
            type="text"
            value={author}
            placeholder="Author Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setAuthor(e.target.value)}
          />

          {/* Publish Date Input */}
          <input
            type="date"
            value={publishDate}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setPublishDate(e.target.value)}
          />

          {/* Update Button */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleUpdate}
          >
            Update Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
