 


import React from 'react';
  import HeroSection from '../components/hero';
  import {Dashboard} from '../components/Dashboard';
   import { MonthlyReport } from '../components/monthly';
    import { ExpenseDashboard } from '../components/summary.js';
   

export const PaidDashPage = () => {
  return (
    <>
      <HeroSection />
      <Dashboard />
      <MonthlyReport />
        <ExpenseDashboard />
    </>
  );
};

 