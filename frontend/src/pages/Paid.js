

import React from 'react';
 import { ExpenseDashboard } from '../components/summary.js';
 import HeroSection from '../components/hero';
 import {Dashboard} from '../components/Dashboard';
 import PaidDashboard from '../components/PaidDashboard';



export const PaidPage = () => {
  return (
    <>
      <HeroSection />
      <PaidDashboard />
      <Dashboard />
      <ExpenseDashboard />
    </>
  );
};

 