 import React from 'react';

const CTASection = () => {
  return (
    <section className="bg-blue-900 py-16 px-6 sm:px-12 md:px-24 lg:px-32 text-center text-white rounded-t-3xl">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Take Control of Your Expenses?
      </h2>
      <p className="text-lg mb-8">
        Join thousands managing their money smartly with our easy-to-use tracker.
      </p>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-lg font-semibold px-8 py-4 rounded transition">
        Get Started Now
      </button>
    </section>
  );
};

export default CTASection;
