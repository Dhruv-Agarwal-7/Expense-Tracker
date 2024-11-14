import React from 'react';

const Testimonials = () => {
  return (
    <div className='bg-green-50 py-20'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <h2 className='text-4xl font-bold text-green-800 mb-10'>What Our Users Say</h2>
        <div className='flex flex-col md:flex-row justify-center items-center gap-8'>
          <div className='bg-green-100 shadow-md rounded-lg p-6 w-full md:w-1/3'>
            <p className='text-green-700'>
              "Expense Tracker has changed the way I manage my finances. It's simple and effective!"
            </p>
            <p className='text-green-800 mt-4 font-semibold'>- John Doe</p>
            <img src="/review.jpg" alt="John Doe" className='text-green-800 mt-4 rounded-full mx-auto h-12 w-12'/>
          </div>
          <div className='bg-green-100 shadow-md rounded-lg p-6 w-full md:w-1/3'>
            <p className='text-green-700'>
              "I love how I can set budgets and track my spending. Highly recommend it!"
            </p>
            <p className='text-green-800 mt-4 font-semibold'>- Jane Smith</p>
            <img src="/review.jpg" alt="Jane Smith" className='text-green-800 mt-4 rounded-full mx-auto h-12 w-12'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
