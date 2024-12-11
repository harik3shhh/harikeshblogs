import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { IoAdd } from "react-icons/io5";
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from "react-icons/md";



const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const [openModal, setOpenModal] = useState(false); // For modal state
  const [categoryName, setCategoryName] = useState(''); // For creating/updating category
  const [selectedCategory, setSelectedCategory] = useState(null); // For updating category

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`
        }
      };
      const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/category/delete-category/${id}`, config);
      if (data.success) {
        toast.success(`Category Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  };

  // HANDLE SUBMIT for creating/updating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`
        }
      };

      if (selectedCategory) {
        // Update Category
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/category/update-category/${selectedCategory._id}`, { name: categoryName }, config);
        if (data.success) {
          toast.success("Category Updated");
        } else {
          toast.error(data.message);
        }
      } else {
        // Create Category
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/category/create-category`, { name: categoryName }, config);
        if (data.success) {
          toast.success("Category Created");
        } else {
          toast.error(data.message);
        }
      }

      setCategoryName('');
      setSelectedCategory(null);
      setOpenModal(false);
      getAllCategory();

    } catch (error) {
      toast.error("Something went wrong while saving category");
    }
  };

  // OPEN MODAL for creating a new category
  const openAddCategoryModal = () => {
    setCategoryName('');
    setSelectedCategory(null);
    setOpenModal(true);
  };

  // OPEN MODAL for updating an existing category
  const openUpdateCategoryModal = (category) => {
    setCategoryName(category.name);
    setSelectedCategory(category);
    setOpenModal(true);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
        <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6 relative">
          {/* Title and + Button in the same row */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-crimsonpro text-gray-700">Manage Categories</h1>
            {/* Add Category Button in the top-right corner */}
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg p-2 rounded-3xl"
              onClick={openAddCategoryModal}>
              <IoAdd size={25}/> 

            </button>
          </div>

          {/* Table for Categories */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {categories?.map((c) => (
                <tr key={c._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{c.name}</td>
                  <td className="py-3 px-6 text-center">
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => openUpdateCategoryModal(c)}>
                      <MdModeEdit size={15}/>

                    </button>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(c._id)}>
                        <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Popup */}
          {openModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  {selectedCategory ? "Update Category" : "Add Category"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                  <div className="flex justify-end space-x-4">
                    <button 
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                      onClick={() => setOpenModal(false)}>
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                      {selectedCategory ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CreateCategory;
