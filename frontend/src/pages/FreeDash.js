import React from 'react';
// import Login from '../components/Auth/Login';

import HeroSection from '../components/hero';
import {Dashboard} from '../components/Dashboard';
 import DashboardPreview from '../components/DashPreview';  
 
export const FreeDashPage = () => {
  return (

    <>  
    
     <HeroSection />
       <DashboardPreview />
       <Dashboard />
     
     

    </>
  );
};

 