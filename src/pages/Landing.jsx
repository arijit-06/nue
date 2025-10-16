import React from 'react';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import HowItWorks from '../components/landing/HowItWorks';
import Portfolio from '../components/landing/Portfolio';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/common/Footer';

const Landing = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Portfolio />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Landing;