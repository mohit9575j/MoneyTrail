import React from 'react';
// import Login from '../components/Auth/Login';

import HeroSection from '../components/hero';
 import FeaturesSection from '../components/FeaturesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import DashboardPreview from '../components/DashPreview';  
import FAQSection from '../components/FAQSection';
import CTASection from '../components/Cta';
import TestimonialsSection from '../components/TestimonialsSection';

export const HomePage = () => {
  return (

    <>  
    
     <HeroSection />
      <FeaturesSection />
      <WhyChooseUs />
      <DashboardPreview />
        <FAQSection />
       <TestimonialsSection />

       <CTASection />

    </>
  );
};

 