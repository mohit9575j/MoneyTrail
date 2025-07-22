// src/components/WhyChooseUs.js
import React from 'react';

const benefits = [
  {
    title: '100% Free',
    icon: '💸',
  },
  {
    title: 'Secure & Private',
    icon: '🔐',
  },
  {
    title: 'Mobile Friendly',
    icon: '📱',
  },
  {
    title: 'Easy to Use',
    icon: '👌',
  },
  {
    title: 'Real-time Sync',
    icon: '🔄',
  },
  {
    title: 'Cloud Backup',
    icon: '☁️',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-50 py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 text-lg">Built to make your financial life easier</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-blue-900">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
