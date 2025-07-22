 



// src/components/Footer.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const hideFooter = ['/login', '/register'].includes(location.pathname);

  if (hideFooter) return null;

  return (
    <footer className="bg-blue-600 text-white px-6 sm:px-12">
      <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Left: Logo + App Name */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center text-xl shadow-md">
            E
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Expense Manager</h3>
            <p className="text-sm text-gray-300">Track. Analyze. Save.</p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col md:items-center space-y-3">
          <h4 className="text-lg font-semibold mb-2">Menu</h4>
          <div className="flex flex-col gap-2 text-base">
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
            <Link to="/summary" className="hover:text-yellow-300 transition">Summary</Link>
            <Link to="/monthly" className="hover:text-yellow-300 transition">Monthly</Link>
          </div>
        </div>

       {/* Center: Navigation Links */}
        <div className="flex flex-col md:items-center space-y-3">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <div className="flex flex-col gap-2 text-base">
            <Link to="/#" className="hover:text-yellow-300 transition">about us</Link>
            <Link to="/#" className="hover:text-yellow-300 transition">contact us</Link>
            <Link to="/#" className="hover:text-yellow-300 transition">privacy policy</Link>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="md:text-right space-y-1 text-sm">
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p>Mohit Joshi</p>
          <p>📞 961728725</p>
          <p>📧 joshimohit8130@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 pt-6 pb-8 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Expense Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
