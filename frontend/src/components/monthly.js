import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, DollarSign, FileText, RefreshCw } from 'lucide-react';

export const MonthlyReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get JWT token from localStorage
  const getToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('jwt_token') || localStorage.getItem('authToken');
  };

  // Fetch monthly report data
  const fetchMonthlyReport = async () => {
    const token = getToken();
    
    if (!token) {
       setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/expenses/report/monthly', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Transform data for better display
      const transformedData = response.data.map(item => ({
        ...item,
        monthName: getMonthName(item.month),
        displayName: `${getMonthName(item.month)} ${item.year}`,
        averagePerExpense: item.totalExpenses > 0 ? (item.totalAmount / item.totalExpenses).toFixed(2) : 0
      }));

      setReportData(transformedData);
     } catch (error) {
      console.error('Error fetching monthly report:', error);
      
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
        setError('Authentication failed');
      } else if (error.response?.status === 404) {
        toast.info('No monthly data found.');
        setReportData([]);
      } else {
        toast.error('Failed to fetch monthly report. Please try again.');
        setError('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Convert month number to month name
  const getMonthName = (monthNumber) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthNumber - 1] || 'Unknown';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Load report on component mount
  useEffect(() => {
    fetchMonthlyReport();
  }, []);

  // Calculate totals
  const totalAmount = reportData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalExpenses = reportData.reduce((sum, item) => sum + item.totalExpenses, 0);

  if (error && reportData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Report</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchMonthlyReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Monthly Report</h2>
              <p className="text-gray-600">Track your spending patterns over time</p>
            </div>
          </div>
          
          <button
            onClick={fetchMonthlyReport}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Loading...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Quick Stats */}
        {reportData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Total Amount</span>
              </div>
              <p className="text-2xl font-bold text-green-800 mt-1">{formatCurrency(totalAmount)}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Total Expenses</span>
              </div>
              <p className="text-2xl font-bold text-blue-800 mt-1">{totalExpenses}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Avg. per Month</span>
              </div>
              <p className="text-2xl font-bold text-purple-800 mt-1">
                {reportData.length > 0 ? formatCurrency(totalAmount / reportData.length) : '₹0'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chart Section */}
      {reportData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="displayName" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'totalAmount' ? formatCurrency(value) : value,
                    name === 'totalAmount' ? 'Amount' : 'Expenses'
                  ]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="totalAmount" 
                  fill="#8b5cf6" 
                  name="Total Amount"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="totalExpenses" 
                  fill="#06b6d4" 
                  name="Total Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Data Table */}
      {reportData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Amount</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Expenses</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Average per Expense</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr 
                    key={`${item.year}-${item.month}`}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{item.monthName}</td>
                    <td className="py-3 px-4 text-gray-600">{item.year}</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">
                      {formatCurrency(item.totalAmount)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-blue-600">
                      {item.totalExpenses}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-purple-600">
                      {formatCurrency(item.averagePerExpense)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Data Message */}
      {!loading && reportData.length === 0 && !error && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Monthly Data</h3>
            <p className="text-gray-600">No expense data found for monthly report.</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Report</h3>
            <p className="text-gray-600">Fetching your monthly expense data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

 