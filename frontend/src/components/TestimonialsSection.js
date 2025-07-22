// src/components/TestimonialsSection.js
import React from 'react';

const testimonials = [
  {
    name: 'Ankita Sharma',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    comment:
      'This expense manager changed the way I handle money. It’s simple, clean and helps me stay in control.',
  },
  {
    name: 'Rahul Mehta',
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
    comment:
      'I love the real-time analytics and clean dashboard. Highly recommended for anyone serious about budgeting.',
  },
  {
    name: 'Priya Nair',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    comment:
      'Secure and mobile-friendly! I can track my daily spending even on the go.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-12 md:px-24 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">What Our Users Say</h2>
        <p className="text-gray-600 text-lg">Trusted by thousands across India</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((user, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white shadow-md"
            />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{user.name}</h3>
            <p className="text-gray-700 text-sm">{user.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
