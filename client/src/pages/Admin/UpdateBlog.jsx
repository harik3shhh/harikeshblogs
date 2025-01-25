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
  const [photo, setPhoto] = useState(null);
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
      const blogData = new FormData();
      blogData.append('category', category);
      blogData.append('title', title);
      blogData.append('caption', caption);
      blogData.append('description', description);
      blogData.append('author', author);
      blogData.append('publishDate', publishDate);
      if (photo) {
        blogData.append('photo', photo);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/blog/update-blog/${id}`,
        blogData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('Blog Updated Successfully');
        navigate('/');
      } else {
        toast.error('Failed to Update Blog');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating blog');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold text-indigo-500 mb-8 shadow-md rounded-md p-4">
          UPDATE BLOG
        </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  placeholder="Select a category"
                  size="large"
                  className="w-full border border-gray-300 rounded-md"
                  onChange={(value) => setCategory(value)}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <label className="block border border-dashed border-gray-300 rounded-md p-4 cursor-pointer text-center text-gray-500 hover:bg-gray-100">
                  {photo ? photo.name : 'Click to upload an image'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {/* Image Preview */}
                <div className="mt-4">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Uploaded"
                      className="w-full max-h-48 rounded-md object-cover"
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/api/v1/blog/blog-photo/${id}`}
                      alt="Current Blog"
                      className="w-full max-h-48 rounded-md object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="Enter blog title"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Caption Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Caption
                </label>
                <input
                  type="text"
                  value={caption}
                  placeholder="Enter blog caption"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Description
                </label>
                <textarea
                  value={description}
                  placeholder="Write the blog description here"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                ></textarea>
              </div>

              {/* Author Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  placeholder="Enter author name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              {/* Publish Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={publishDate}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md font-medium hover:bg-indigo-700 transition"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
