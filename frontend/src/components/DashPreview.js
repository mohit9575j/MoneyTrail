// src/components/DashboardPreview.js
import React from 'react';
 
import dashboard2 from '../assets/summary.png';

const dashboardImages = [  dashboard2];

const DashboardPreview = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            See Your Finances Clearly
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Visualize your spending, track categories, and understand trends with our smart dashboard.
          </p>
          <ul className="text-gray-700 space-y-3 text-left list-disc list-inside">
            <li>📅 Monthly Reports</li>
            <li>📊 Analytics & Charts</li>
            <li>📁 Easy Expense Tracking</li>
            <li>☁️ Cloud-Synced Data</li>
          </ul>
        </div>

        {/* Right Side: Images with animation */}
        <div className="md:w-1/2 flex flex-col gap-6 items-center">
          {dashboardImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Dashboard ${index + 1}`}
              className="w-full rounded-xl shadow-xl transition-transform duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
