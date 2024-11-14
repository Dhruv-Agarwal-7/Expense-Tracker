import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className='bg-green-50 py-20'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <h2 className='text-4xl font-bold text-green-800 mb-6'>Get Started Today</h2>
        <p className='text-lg text-green-700 mb-6'>
          Join thousands of users who are managing their expenses better with Expense Tracker.
        </p>
        <Link to='/signup'>
        <button className='bg-green-800 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-700'>
          Sign Up Now
        </button></Link>
      </div>
    </div>
  );
};

export default CallToAction;
