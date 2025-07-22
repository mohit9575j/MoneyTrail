// src/components/FAQSection.js
import React, { useState } from 'react';

const faqs = [
  {
    question: 'Is my expense data secure?',
    answer: 'Yes, we use end-to-end encryption and secure cloud storage to protect your data.',
  },
  {
    question: 'Can I use this app for free?',
    answer: 'Absolutely! Our core features are free forever with optional premium tools coming soon.',
  },
  {
    question: 'Is it mobile-friendly?',
    answer: 'Yes, the app works smoothly on all mobile devices and screen sizes.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'No need to install. It’s a web app — just sign in and start managing your expenses.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-blue-50 py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg">Get quick answers to common queries</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-sm transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-blue-900 font-medium text-lg focus:outline-none"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
