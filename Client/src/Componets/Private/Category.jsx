import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import string from '../../String';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Category = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [formData, setFormData] = useState({});    
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${string}/category/getCategory`, {
        withCredentials: true,
      });
      setIncomeCategories(data.filter((category) => category.categoryType === 'income'));
      setExpenseCategories(data.filter((category) => category.categoryType === 'expense'));
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleAddCategory = async () => {
    try {
        const { data } = await axios.post(
            `${string}/category/addCategory`,
            formData,
            { 
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        toast.success(data.message);
        fetchCategories();
        setFormData({});
        setShowAddCategoryForm(false);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
        const { data } = await axios.delete(
            `${string}/category/deleteCategory/${deleteCategoryId}`,
            { 
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        toast.success(data.message);
        fetchCategories();
        setShowDeleteConfirmation(false);
        setDeleteCategoryId(null);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleEditCategory = async () => {
    try {
        const { data } = await axios.put(
            `${string}/category/updateCategory/${editCategoryData._id}`,
            formData,
            { 
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        toast.success(data.message);
        fetchCategories();
        setFormData({});
        setEditCategoryData(null);
        setShowEditCategoryForm(false);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowAddCategoryForm(false);
      setShowEditCategoryForm(false);
      setShowDeleteConfirmation(false);
      setFormData({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditButtonClick = (category) => {
    setFormData({ categoryName: category.categoryName, categoryType: category.categoryType });
    setEditCategoryData(category);
    setShowEditCategoryForm(true);
  };

  const handleDeleteButtonClick = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-5">
            <button
              onClick={() => setShowAddCategoryForm(true)}
              className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
            >
              Add Category
            </button>
          </div>

        {showAddCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg z-50 mx-auto w-96 max-w-md">
              <h3 className="mb-4 text-xl font-medium text-green-800 hover:bg-green-700">Add Category</h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Category Name"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  id="categoryType"
                  value={formData.categoryType}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option selected disabled>Category Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <button
                  onClick={handleAddCategory}
                  className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Edit Category</h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Category Name"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  id="categoryType"
                  value={formData.categoryType}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option defaultValue={true} disabled>Category Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <button
                  onClick={handleEditCategory}
                  className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Delete Category</h3>
              <p>Are you sure you want to delete this category?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Income Categories */}
        {incomeCategories.length > 0 ? <>
        <span className="text-xl font-bold text-green-800 mb-4">Income Categories</span>
        <div className="bg-green-50 p-4 rounded-lg mb-5 shadow-lg">
          <div className="flex flex-col space-y-2">
            {incomeCategories.map((category) => (
              <div key={category._id} className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-lg border-green-700">
                <span className='text-green-800 text-md font-medium'>{category.categoryName}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditButtonClick(category)}
                    className="text-blue-600 hover:underline"
                  >
                    <MdEdit className='text-green text-xl'/>
                  </button>
                  <button
                    onClick={() => handleDeleteButtonClick(category._id)}
                    className="text-red-600 hover:underline"
                  >
                    <MdDelete className='text-red text-xl'/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div></> : null}

        {/* Expense Categories */}
        {expenseCategories.length > 0 ? <>
        <span className="text-xl font-bold text-green-800 mb-4">Expense Categories</span>
        <div className="bg-green-50 p-4 rounded-lg mb-5 shadow-lg">
          <div className="flex flex-col space-y-2">
            {expenseCategories.map((category) => (
              <div key={category._id} className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-lg border-green-700">
              <span className='text-green-800 text-md font-medium'>{category.categoryName}</span>
                <div className="flex space-x-2">
                <button
                    onClick={() => handleEditButtonClick(category)}
                    className="text-blue-600 hover:underline"
                  >
                    <MdEdit className='text-green text-xl'/>
                  </button>
                  <button
                    onClick={() => handleDeleteButtonClick(category._id)}
                    className="text-red-600 hover:underline"
                  >
                    <MdDelete className='text-red text-xl'/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div></> : null}
          </div>
    </>
  );
};

export default Category;
