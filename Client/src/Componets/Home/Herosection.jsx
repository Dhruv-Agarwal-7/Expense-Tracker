import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='bg-green-50 py-20'>
      <div className='max-w-6xl mx-auto px-4 text-left'>
        <h1 className='text-6xl font-bold text-green-800 mb-4'>Welcome to Expense Tracker</h1>
        <p className='text-2xl text-green-700 mb-6'>
          Manage your finances effortlessly and stay on top of your expenses with our easy-to-use platform.
        </p>
        <Link to='/signup'>
        <button className='bg-green-800 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-700'>
          Get Started
        </button></Link>
      </div>
    </div>
  );
};

export default HeroSection;
