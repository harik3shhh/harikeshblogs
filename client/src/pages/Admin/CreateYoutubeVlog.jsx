import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { TiTick } from "react-icons/ti";


const CreateYoutubeVlog = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('link', link);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/blog/create-yt-vlog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(data.message);
      setTitle('');
      setDesc('');
      setLink('');
      setPhoto(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">CREATE <span className='text-red-600'> YouTube </span>VLOGS</h1>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="Enter vlog title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="link">YouTube Link</label>
              <input
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="Enter YouTube video link"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="desc">Description</label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="Enter vlog description"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="photo">Upload Photo</label>
              <input
                type="file"
                id="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                accept="image/*"
                className="block w-full text-gray-700 py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
              />
            </div>

          <div className='flex justify-center items-center'>
            <button
              type="submit"
              className="hover:bg-green-300 shadow-lg hover:text-white text-green-400 font-semibold py-4 mt-2 px-4 rounded-full  focus:outline-none focus:shadow-outline"
            >
              <TiTick size={35}/>

            </button>
          </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateYoutubeVlog;
