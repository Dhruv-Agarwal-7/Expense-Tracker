import React from 'react';

const Services = () => {
  return (
    <div className="bg-green-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Our Services</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Expense Tracker, we offer a variety of services to help you manage your finances effectively and reach your financial goals. Our comprehensive solutions are designed to give you control and clarity over your financial life.
          </p>
        </section>

        <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
          <img src="expensetracking.jpeg" alt="Expense Tracking" className="rounded-full w-1/3 md:w-1/5" />
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Expense Tracking</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Easily track your daily expenses and categorize them to understand where your money is going. Our intuitive interface makes it simple to add, edit, and view your spending.
            </p>
          </div>
        </section>

        <section className="mb-16 flex flex-col md:flex-row-reverse items-center gap-8">
          <img src="budgetmanagement.jpeg" alt="Budget Management" className="rounded-full w-1/3 md:w-1/5" />
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Budget Management</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Set up monthly budgets to keep your spending in check. Our tool helps you allocate funds to different categories and monitors your progress, ensuring you stay within your limits.
            </p>
          </div>
        </section>

        <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
          <img src="financialgoal.jpeg" alt="Financial Goal Setting" className="rounded-full w-1/3 md:w-1/5" />
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Financial Goal Setting</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Define your financial goals and track your progress towards achieving them. Whether it's saving for a vacation, a new car, or an emergency fund, our platform helps you stay on target.
            </p>
          </div>
        </section>

        <section className="mb-16 flex flex-col md:flex-row-reverse items-center gap-8">
          <img src="reports.jpeg" alt="Reports & Insights" className="rounded-full w-1/3 md:w-1/5" />
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Reports & Insights</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Get detailed reports and insights into your spending patterns. Our visual charts and graphs make it easy to analyze your financial habits and make informed decisions.
            </p>
          </div>
        </section>

        <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
          <img src="account.jpeg" alt="Account Integration" className="rounded-full w-1/3 md:w-1/5" />
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Account Integration</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Link your accounts from over 17,000 financial institutions to view all your financial data in one place. This integration helps you get a complete picture of your finances without switching between different apps.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
