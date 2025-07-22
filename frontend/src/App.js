 

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RegisterPage } from './pages/register';
import { LoginPage } from './pages/loginPage';
import { HomePage } from './pages/homePage';
import { SummaryPage } from './pages/summaryPage';
import { MonthlyPage } from './pages/monthlyPage';
import { UpgradePage } from './pages/UpgradePage';
import { PaidPage } from './pages/Paid';
import { FreeDashPage } from './pages/FreeDash';
import { PaidDashPage } from './pages/PaidDash';

import Navbar from './components/navbar';
import Footer from './components/footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        {/* Private Routes (Login Required) */}
        <Route
          path="/free"
          element={
            <PrivateRoute>
              <FreeDashPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/paid"
          element={
            <PrivateRoute>
              <PaidPage />
            </PrivateRoute>
          }
        />

        {/* Paid User Only Routes */}
        <Route
          path="/summary"
          element={
            <PrivateRoute requirePaid={true}>
              <SummaryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/monthly"
          element={
            <PrivateRoute requirePaid={true}>
              <MonthlyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/paid-dashboard"
          element={
            <PrivateRoute requirePaid={true}>
              <PaidDashPage />
            </PrivateRoute>
          }
        />

        {/* Upgrade is public — free users get redirected here */}
        <Route path="/upgrade" element={<UpgradePage />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
