import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import string from '../../String';

// Fetch account summary data (balance, income, expenses)
const fetchAccountSummary = async () => {
  try {
    const { data } = await axios.get(`${string}/transaction/getTransaction`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    let balance = 0;
    let income = 0;
    let expense = 0;

    data.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance += transaction.amount;
        income += transaction.amount;
      } else {
        balance -= transaction.amount;
        expense += transaction.amount;
      }
    });

    return { balance, income, expense };
  } catch (error) {
    console.error('Error fetching account summary:', error);
    return { balance: 0, income: 0, expense: 0 };
  }
};

const fetchCategories = async (setCategories) => {
  try {
    const { data } = await axios.get(`${string}/category/getCategory`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    setCategories(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Fetch recent transactions
const fetchRecentTransactions = async () => {
  try {
    const { data } = await axios.get(`${string}/transaction/getRecentTransactions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return data.transactions;
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return [];
  }
};

// Fetch budget data (categories, budgets, and spending)
const fetchSpendingCategoryData = async () => {
  try {
    const { data } = await axios.get(`${string}/transaction/spendingCategories`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const categoryPercentages = data.categoryPercentages.map(item => ({
      ...item,
      percentage: parseFloat(item.percentage) // Convert to number
    }));
    
    return categoryPercentages;
  } catch (error) {
    console.error('Error fetching budget data:', error);
    return [];
  }
};

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [spendingData, setSpendingData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const summary = await fetchAccountSummary();
      setBalance(summary.balance);
      setIncome(summary.income);
      setExpense(summary.expense);

      const transactions = await fetchRecentTransactions();
      setRecentTransactions(transactions);

      const spendingData = await fetchSpendingCategoryData();
      setSpendingData(spendingData);
      console.log(spendingData);

      await fetchCategories(setCategories); // Fetch categories
    };

    fetchData();
  }, []);

  // Create a lookup object for category names
  const categoryLookup = categories.reduce((acc, category) => {
    acc[category._id] = category.categoryName;
    return acc;
  }, {});

  const data = [
    { name: 'January', expenses: 400, income: 2400, netWorth: 12000 },
    { name: 'February', expenses: 300, income: 2210, netWorth: 12210 },
    { name: 'March', expenses: 200, income: 2290, netWorth: 12400 },
    { name: 'April', expenses: 278, income: 2000, netWorth: 12600 },
    { name: 'May', expenses: 189, income: 2181, netWorth: 12800 },
    { name: 'June', expenses: 239, income: 2500, netWorth: 13000 },
  ];

  return (
    <div className="p-6 m-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Summary */}
        <div className='p-4 rounded-lg shadow-lg bg-green-50'>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Account Summary</h3>
          <p className="text-lg">Total Balance:  ₹ {balance}</p>
          <p className="text-lg">Total Income: ₹ {income}</p>
          <p className="text-lg">Total Expenses: ₹ {expense}</p>
        </div>
        {/* Recent Transactions */}
        <div className='p-4 rounded-lg shadow-lg bg-green-50'>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Recent Transactions</h3>
          <ul>
            {recentTransactions.map((transaction, index) => (
              <li key={index} className="mb-2">
                <p>{new Date(transaction.date).toDateString().slice(4)}: {transaction.description} - ₹{transaction.amount} ({categoryLookup[transaction.category] || 'Unknown Category'})</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Spending Categories */}
        <div className='p-4 rounded-lg shadow-lg bg-green-50'>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Spending Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="percentage" data={spendingData} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label={spendingData.category} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Spending Trends */}
        <div className='p-4 rounded-lg shadow-lg bg-green-50'>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Spending Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
