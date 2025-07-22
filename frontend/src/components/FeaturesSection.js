// src/components/FeaturesSection.js
import React from 'react';

const features = [
  {
    title: 'Track Your Expenses',
    description: 'Easily add and monitor your daily expenses in real-time.',
    icon: '🧾',
  },
  {
    title: 'Budget Planning',
    description: 'Set monthly budgets and get notified when you exceed them.',
    icon: '📊',
  },
  {
    title: 'Real-time Analytics',
    description: 'Visualize your spending patterns and track trends.',
    icon: '📈',
  },
  {
    title: 'Secure Cloud Storage',
    description: 'Your data is encrypted and safely stored in the cloud.',
    icon: '🔒',
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Powerful Features</h2>
        <p className="text-gray-600 text-lg">
          Everything you need to manage your money better
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-6 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl">{feature.icon}</div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700 text-base">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
