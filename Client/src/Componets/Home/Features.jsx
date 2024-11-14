import React from 'react';

const Features = () => {
  return (
    <div className='py-20 bg-green-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='text-4xl font-bold text-green-800 mb-10 text-center'>Our Features</h2>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <img src="/OIG5.jpeg" alt="Feature Image" className='rounded-full w-full md:w-1/3' />
          <div className='w-full md:w-2/3 text-left'>
            <h3 className='text-3xl font-semibold text-green-800 mb-4'>Keep tabs on your money in one place</h3>
            <p className='text-lg text-green-700'>
              Link your accounts from more than 17,000 financial institutions and view your connected transactions across them in one place.
            </p>
          </div>
        </div>
        <div className='flex flex-col-reverse md:flex-row items-center gap-8 mt-16'>
          <div className='w-full md:w-2/3 text-left'>
            <h3 className='text-3xl font-semibold text-green-800 mb-4'>Set Budgets and Achieve Goals</h3>
            <p className='text-lg text-green-700'>
              Set monthly budgets and track your spending to ensure you stay on target with your financial goals.
            </p>
          </div>
          <img src="/OIG4.jpeg" alt="Feature Image" className='rounded-full w-full md:w-1/3' />
        </div>
        <div className='flex flex-col md:flex-row items-center gap-8 mt-16'>
          <img src="OIG6.jpeg" alt="Feature Image" className='rounded-full w-full md:w-1/3' />
          <div className='w-full md:w-2/3 text-left'>
            <h3 className='text-3xl font-semibold text-green-800 mb-4'>Analyze Your Spending</h3>
            <p className='text-lg text-green-700'>
              Gain insights into your spending patterns with detailed reports and visual charts to make informed financial decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
