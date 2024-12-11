import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import Layout from '../../components/Layout';

const PublishBlog = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [photo, setPhoto] = useState('');
  const [author, setAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toolbarOptions = [
    [{ 'header': [1, 2, false] }], // Add heading options
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ];

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || !caption || !description || !author || !publishDate) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const blogData = new FormData();
      blogData.append('category', category);
      blogData.append('title', title);
      blogData.append('caption', caption);
      blogData.append('description', description);
      blogData.append('photo', photo);
      blogData.append('author', author);
      blogData.append('publishDate', publishDate);

      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/create-blog`, blogData);
      if (data?.success) {
        toast.success('Blog Created Successfully');
        navigate('/');
      } else {
        toast.error('Failed to Create Blog');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while creating Blog');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8 p-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Write Blog</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CATEGORY DROPDOWN */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {categoryName || 'Select Category'}
              </button>
              <div
                className={`absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg overflow-hidden transition-all duration-300 ${dropdownOpen ? 'max-h-96' : 'max-h-0'}`}
                style={{ transition: 'max-height 0.3s ease-in-out' }}
              >
                {categories?.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => {
                      setCategory(c._id);
                      setCategoryName(c.name);
                      setDropdownOpen(false);
                    }}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            {/* UPLOAD IMAGE */}
            <div className="flex items-center space-x-4">
              <label htmlFor="photo" className="font-semibold">Upload Image:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            {/* TITLE */}
            <input
              type="text"
              value={title}
              placeholder="Blog Title"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* CAPTION */}
            <input
              type="text"
              value={caption}
              placeholder="Caption"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setCaption(e.target.value)}
            />

            {/* DESCRIPTION */}
            <div className="mb-6">
              <label className="font-semibold mb-2 block">Description:</label>
              <div className="rounded p-2 border border-gray-300 h-96">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Write your blog content here..."
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                  className="h-80" // Set fixed height for the editor
                />
              </div>
            </div>

            {/* AUTHOR */}
            <input
              type="text"
              value={author}
              placeholder="Author Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setAuthor(e.target.value)}
            />

            {/* PUBLISH DATE */}
            <input
              type="date"
              value={publishDate}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setPublishDate(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
            >
              PUBLISH BLOG
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="border border-gray-300 p-4 rounded space-y-4">
            <h3 className="text-xl font-bold">{title || 'Blog Title'}</h3>
            <h5 className="text-lg">{caption || 'Caption goes here...'}</h5>
            <p className="text-gray-600">
              By <strong>{author || 'Author Name'}</strong> on{' '}
              {publishDate ? new Date(publishDate).toDateString() : 'Publish Date'}
            </p>
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Blog"
                className="w-full h-auto mb-4 rounded"
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: description }} className="text-gray-700" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublishBlog;
