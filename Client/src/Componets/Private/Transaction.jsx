import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactSlider from 'react-slider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import string from '../../String';
import toast from 'react-hot-toast';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesTransaction, setCategoriesTransaction] = useState([]);
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [showEditTransactionForm, setShowEditTransactionForm] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showExportConfirmation, setShowExportConfirmation] = useState(false);
  const [deleteCategoryId, setDeleteTransactionId] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [filterCategory, setFilterCategory] = useState('');
  const [filterText, setFilterText] = useState('');
  const [amountRange, setAmountRange] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    note: '',
    amount: '',
    currency: 'INR',
    recurrence: 'never', // Default recurrence
    end: null,
    remind: null,
    photo: null,
    transferTo: '',
    transferFrom: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategoriesForTransaction();
      await fetchTransactions();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.type) {
      fetchCategories();
    }
  }, [formData.type]);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`${string}/transaction/getTransaction`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const adjustedTransactions = data.transactions.map(transaction => ({
        ...transaction,
        amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
      }));
      setTransactions(adjustedTransactions);
      const amounts = adjustedTransactions.map(t => t.amount);
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      setMin(minAmount);
      setMax(maxAmount);
      setAmountRange([minAmount, maxAmount]);
      setFilteredTransactions(adjustedTransactions); // Initialize filtered transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${string}/category/getCategory`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setCategories(data.filter((category) => category.categoryType === formData.type));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCategoriesForTransaction = async () => {
    try {
      const { data } = await axios.get(`${string}/category/getCategory`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setCategoriesTransaction(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleAddTransaction = async () => {
    try {
      const { data } = await axios.post(`${string}/transaction/addTransaction`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      toast.success(data.message);
      fetchTransactions();
      setFormData({});
      setShowAddTransactionForm(false);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleExportTransaction = async () => {
    try {
      const { data } = await axios.get(`${string}/transaction/getTransaction`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleEditTransaction = async () => {
    try {
      const { data } = await axios.put(`${string}/transaction/editTransaction/${editTransactionData._id}`,
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
      });
      toast.success(data.message);
      fetchTransactions();
      setFormData({});
      setEditTransactionData(null);
      setShowEditTransactionForm(false);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      const { data } = await axios.delete(`${string}/transaction/deleteTransaction/${deleteCategoryId}`,
        { 
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
      );
      toast.success(data.message);
      fetchTransactions();
      setShowDeleteConfirmation(false);
      setDeleteTransactionId(null);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowAddTransactionForm(false);
      setShowEditTransactionForm(false);
      setShowDeleteConfirmation(false);
      setShowExportConfirmation(false);
      setFormData({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditButtonClick = (transaction) => {
    setFormData({
        type: transaction.type,
        category: transaction.category,
        date: transaction.date.split('T')[0],
        note: transaction.note,
        amount: transaction.amount,
        currency: transaction.currency,
        recurrence: transaction.recurrence,
        end: transaction.end,
        remind: transaction.remind,
        photo: transaction.photo,
        transferTo: transaction.transferTo,
        transferFrom: transaction.transferFrom
    });
    setEditTransactionData(transaction);
    setShowEditTransactionForm(true);
};

useEffect(() => {
    if (editTransactionData) {
    }
  }, [editTransactionData]);

  useEffect(() => {
  }, [formData]);

  const handleDeleteButtonClick = (transactionId) => {
    setDeleteTransactionId(transactionId);
    setShowDeleteConfirmation(true);
  };

  const getCategoryNameById = (id) => {  
    const category = categoriesTransaction.find((category) => category._id === id);  
    return category ? category.categoryName : 'Unknown Category';
  };

  const handleFilterChange = () => {
    const filtered = transactions.filter(transaction => {
      const matchesCategory = filterCategory ? transaction.category === filterCategory : true;
      const matchesText = filterText ? transaction.note.includes(filterText) : true;
      const matchesAmount = transaction.amount >= amountRange[0] && transaction.amount <= amountRange[1];
      return matchesCategory && matchesText && matchesAmount;
    });
    setFilteredTransactions(filtered);
  };
  
  
  useEffect(() => {
    if (filterCategory === '' && filterText === '' && amountRange[0] === min && amountRange[1] === max) {
      setFilteredTransactions(transactions);
    } else {
      handleFilterChange();
    }
  }, [filterCategory, filterText, amountRange, transactions]);

  useEffect(() => {
    if (transactions.length) {
      const amounts = transactions.map(t => t.amount);
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      setMin(minAmount);
      setMax(maxAmount);
      setAmountRange([minAmount, maxAmount]);
      setFilteredTransactions(transactions); // Set filtered transactions initially
    }
  }, [transactions]);
  

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => setShowAddTransactionForm(true)}
          className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
        >
          Add Transaction
        </button>
        {/* <button
          onClick={() => setShowExportTransactionForm(true)}
          className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
        >
          Export
        </button> */}
      </div>

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center">
          <label className="mr-2">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {categoriesTransaction.map(category => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Search:</label>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder='Search by Note'
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-2">Amount:</label>
          <span className='text-gray-700 font-bold'>{amountRange[0]}</span>
          <ReactSlider
            className="w-48 h-4 mx-2"
            thumbClassName="w-4 h-4 bg-green-800 rounded-full cursor-pointer"
            trackClassName="h-1 bg-gray-300 my-2"
            min={min}
            max={max}
            value={amountRange}
            onChange={(values) => setAmountRange(values)}
            withTracks={true}
          />
          <span className="mx-2"></span>
          <span className='text-gray-700 font-bold'>{amountRange[1]}</span>
        </div>
      </div>

      {showAddTransactionForm && (
        <div ref={formRef} className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Add Transaction</h3>
            <div className='flex justify-between'>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option defaultValue={true}>Select Type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            {formData.type !== 'transfer' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.type === 'transfer' && (
              <>
                <div className='flex justify-between'>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Transfer To</label>
                    <select
                      name="transferTo"
                      value={formData.transferTo}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select User</option>
                      {/* {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Transfer From</label>
                    <select
                      name="transferFrom"
                      value={formData.transferFrom}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select User</option>
                      {/* {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className='flex justify-between'>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="INR">INR</option>
                  {/* Add more currency options as needed */}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Recurrence</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              >
                <option value="never">Never</option>
                <option value="oneD">One Day</option>
                <option value="twoD">Two Days</option>
                <option value="workD">Work Days</option>
                <option value="oneW">One Week</option>
                <option value="twoW">Two Weeks</option>
                <option value="fourW">Four Weeks</option>
                <option value="oneM">One Month</option>
                <option value="twoM">Two Months</option>
                <option value="threeM">Three Months</option>
                <option value="sixM">Six Months</option>
                <option value="oneY">One Year</option>
              </select>
            </div>
            {formData.recurrence !== "never" ? <>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Remind Date</label>
                  <input
                    type="date"
                    name="remind"
                    value={formData.remind}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div></> : null}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddTransaction}
                className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700 mr-2"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddTransactionForm(false)}
                className="bg-red-600 px-5 py-3 rounded-3xl text-white hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditTransactionForm && (
        <div ref={formRef} className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Edit Transaction</h3>
            <div className='flex justify-between'>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option defaultValue={true}>Select Type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            {formData.type !== 'transfer' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.type === 'transfer' && (
              <>
                <div className='flex justify-between'>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Transfer To</label>
                    <select
                      name="transferTo"
                      value={formData.transferTo}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select User</option>
                      {/* {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Transfer From</label>
                    <select
                      name="transferFrom"
                      value={formData.transferFrom}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select User</option>
                      {/* {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className='flex justify-between'>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="INR">INR</option>
                  {/* Add more currency options as needed */}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Recurrence</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              >
                <option value="never">Never</option>
                <option value="oneD">One Day</option>
                <option value="twoD">Two Days</option>
                <option value="workD">Work Days</option>
                <option value="oneW">One Week</option>
                <option value="twoW">Two Weeks</option>
                <option value="fourW">Four Weeks</option>
                <option value="oneM">One Month</option>
                <option value="twoM">Two Months</option>
                <option value="threeM">Three Months</option>
                <option value="sixM">Six Months</option>
                <option value="oneY">One Year</option>
              </select>
            </div>
            {formData.recurrence !== "never" ? <>
              <div className='flex justify-between'>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Remind Date</label>
                  <input
                    type="date"
                    name="remind"
                    value={formData.remind}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div></> : null}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditTransaction}
                className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => setShowEditTransactionForm(false)}
                className="bg-red-600 px-5 py-3 rounded-3xl text-white hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Delete Transaction</h3>
              <p>Are you sure you want to delete this transaction?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTransaction}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showExportConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Export Transactions</h3>
              <p>Do you want to export these transactions into a csv?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowExportConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportTransaction}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      {transactions.length > 0 ? (
        <div className="space-y-4">
        {filteredTransactions.map(transaction => (
                <div key={transaction._id} className="bg-green-50 p-4 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex space-x-4 mb-2">
                        <span className="text-xl font-bold text-green-800">{getCategoryNameById(transaction.category)}</span>
                        <span className="text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                        {transaction.type === 'transfer' && (
                        <div className="flex space-x-2 mb-2 text-sm text-gray-700">
                            <span>From: {transaction.transferFrom}</span>
                            <span>To: {transaction.transferTo}</span>
                        </div>
                        )}
                        <p className="text-sm text-gray-700">{transaction.note}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p
                        className={`text-lg font-bold ${
                            transaction.type === 'income'
                            ? 'text-green-500'
                            : transaction.type === 'expense'
                            ? 'text-red-500'
                            : transaction.transferFrom === 'me'
                            ? 'text-black'
                            : 'text-black'
                        }`}
                        >
                        {`${transaction.amount} ${transaction.currency}`}
                        </p>
                        <div className="flex space-x-2">
                            <button className="text-green-800 hover:text-green-500" onClick={() => handleEditButtonClick(transaction)}>
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDeleteButtonClick(transaction._id)}
                                className="text-red-600 hover:text-red-400"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        ) : null}
    </div>
    );
};

export default Transaction;
