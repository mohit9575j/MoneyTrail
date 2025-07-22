import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaidDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!data.isPaid) {
          navigate('/upgrade');
        } else {
          setUser(data);
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <p className="text-center p-10">Loading Premium Dashboard...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name} 👑</h1>

      {/* Premium Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">📄 Download Bills</h2>
          <p className="text-gray-600">Easily download your monthly expense bills in PDF.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">📊 Analytics</h2>
          <p className="text-gray-600">View visual charts of your spending categories.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🗓 Monthly Reports</h2>
          <p className="text-gray-600">Access full detailed monthly reports of expenses.</p>
        </div>
      </div>
    </div>
  );
};

export default PaidDashboard;
