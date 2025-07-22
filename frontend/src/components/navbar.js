 
// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showNavbar = !['/login', '/register'].includes(location.pathname);
  const token = localStorage.getItem('token');

  let isPaid = false;
  let isLoggedIn = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isPaid = decoded.isPaid;         // 👈 get value from token
      isLoggedIn = true;
    } catch (err) {
      console.error('Token decoding failed:', err);
      isLoggedIn = false;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!showNavbar) return null;

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-blue-600 font-bold rounded-full flex items-center justify-center">
            E
          </div>
          <span className="text-xl font-semibold">Expense Manager</span>
        </div>

        {/* Center: Menu Links */}
        {isLoggedIn && (
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>

            {!isPaid && (
              <>
                <Link to="/free" className="hover:text-yellow-300 transition">Dashboard</Link>
                <Link to="/upgrade" className="hover:text-yellow-300 transition">Upgrade</Link>
              </>
            )}

            {isPaid && (
              <>
                <Link to="/paid-dashboard" className="hover:text-yellow-300 transition">Paid-Dashboard</Link>
                <Link to="/summary" className="hover:text-yellow-300 transition">Summary</Link>
                <Link to="/monthly" className="hover:text-yellow-300 transition">Monthly Report</Link>
              </>
            )}
          </div>
        )}

        {/* Right: Auth Button */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

