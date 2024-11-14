import React from 'react';

const About = () => {
  return (
    <div className="bg-green-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">About Us</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Expense Tracker, your go-to platform for managing your finances effortlessly. 
            We provide a comprehensive solution for tracking your expenses, setting budgets, and achieving your financial goals.
            Our user-friendly interface and robust features are designed to give you complete control over your money, 
            helping you make informed financial decisions.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is to empower individuals and families to achieve financial stability and independence. 
            We believe that by providing the right tools and insights, everyone can manage their finances effectively and build a secure financial future.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to offer a seamless and intuitive expense tracking experience that integrates with your daily life. 
            We are committed to continuous innovation and improvement, ensuring that our users have access to the best financial management tools available.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
