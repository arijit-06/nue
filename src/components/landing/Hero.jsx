import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="hero-section d-flex align-items-center justify-content-center text-white text-center position-relative" style={{minHeight: '100vh', background: 'linear-gradient(135deg, rgba(13,110,253,0.8), rgba(108,117,125,0.8)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80") center/cover'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="display-3 fw-bold mb-4">Transform Your Store Into a Customer Magnet</h1>
            <p className="lead mb-5">Professional Store Branding | Campaign Setups | Maintenance</p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/estimate" className="btn btn-primary btn-lg px-4">Get Free Estimate</Link>
              <a href="#portfolio" className="btn btn-outline-light btn-lg px-4">View Portfolio</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;