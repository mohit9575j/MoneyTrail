 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [limit] = useState(2); // Items per page
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/expenses?page=${page}&limit=${limit}`);
      
      // Assuming your API response structure is:
      // { expenses: [], totalPages: number, currentPage: number, totalExpenses: number }
      setExpenses(res.data.expenses);
      setTotalPages(res.data.totalPages || Math.ceil(res.data.total / limit));
      setCurrentPage(res.data.currentPage || page);
      setTotalExpenses(res.data.total || res.data.totalExpenses || res.data.expenses.length);
      
    } catch (err) {
      toast.error('Failed to fetch expenses');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
      fetchExpenses(page);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/expenses/${editingId}`, formData);
        toast.success('Expense updated');
      } else {
        await api.post('/expenses', formData);
        toast.success('Expense added');
      }
      setFormData({ title: '', amount: '', category: '' });
      setEditingId(null);
      // Refresh current page after add/update
      fetchExpenses(currentPage);
    } catch (err) {
      toast.error('Error saving expense');
    }
  };

  const handleEdit = expense => {
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category
    });
    setEditingId(expense._id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/expenses/${id}`);
      toast.success('Expense deleted');
      
      // If current page becomes empty after deletion, go to previous page
      if (expenses.length === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchExpenses(currentPage);
      }
    } catch (err) {
      toast.error('Error deleting expense');
    }
  };

  useEffect(() => {
    fetchExpenses(1);
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍽️',
      'Transport': '🚗',
      'Health': '🏥',
      'Shopping': '🛍️',
      'Bills': '💡',
      'Entertainment': '🎬',
      'Education': '📚',
      'Other': '📌'
    };
    return icons[category] || '📌';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-orange-100 text-orange-800',
      'Transport': 'bg-blue-100 text-blue-800',
      'Health': 'bg-red-100 text-red-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Bills': 'bg-yellow-100 text-yellow-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Education': 'bg-green-100 text-green-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  // Pagination component
  const PaginationControls = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>
            Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalExpenses)} of {totalExpenses} expenses
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === 1 || loading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                disabled={loading || page === '...'}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === totalPages || loading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">💰</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-sm text-gray-500">Manage your expenses efficiently</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-400">({totalExpenses} total records)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">+</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? 'Update Expense' : 'Add New Expense'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter expense title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">🍽️ Food</option>
                  <option value="Transport">🚗 Transport</option>
                  <option value="Health">🏥 Health</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Bills">💡 Bills</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Education">📚 Education</option>
                  <option value="Other">📌 Other</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200"
            >
              {editingId ? '✏️ Update Expense' : '➕ Add Expense'}
            </button>
          </form>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📋</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading expenses...</span>
            </div>
          ) : expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
              <p className="text-gray-500 text-center max-w-sm">
                Start tracking your expenses by adding your first expense above.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-8 font-semibold text-gray-700">Expense</th>
                      <th className="text-left py-4 px-8 font-semibold text-gray-700">Category</th>
                      <th className="text-right py-4 px-8 font-semibold text-gray-700">Amount</th>
                      <th className="text-center py-4 px-8 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenses.map(exp => (
                      <tr key={exp._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-4 px-8">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-lg">{getCategoryIcon(exp.category)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{exp.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-8">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(exp.category)}`}>
                            {exp.category}
                          </span>
                        </td>
                        <td className="py-4 px-8 text-right">
                          <span className="text-lg font-semibold text-gray-900">₹{parseFloat(exp.amount).toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-8">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(exp)}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(exp._id)}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              <PaginationControls />
            </>
          )}
        </div>
      </div>
    </div>
  );
};