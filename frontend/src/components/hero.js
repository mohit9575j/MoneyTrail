// src/components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-blue-900 py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Smart Expense Management
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Track your daily spending, stay on budget, and gain insights into your financial life with our simple and secure expense management solution.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded text-xl font-semibold transition">
            Get Started
          </button>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2">
          <img
            src="https://egenius.in/wp-content/uploads/2022/10/EXPENSE-MANAGEMENT.png"
            alt="Expense Management"
            className="w-full max-w-lg mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
