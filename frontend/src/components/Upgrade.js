import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MarkPremiumButton = () => {
  const handleMarkAsPaid = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/mark-paid',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || 'User marked as premium!');

      // Optional: reload to reflect navbar/menu changes
      setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to mark as premium');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleMarkAsPaid}
        className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition duration-300 shadow-md hover:shadow-lg"
      >
        🎉 Mark as Premium
      </button>
    </div>
  );
};

export default MarkPremiumButton;
