import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="mb-2 mb-md-0">
            <span className="fw-bold">NEU</span>
            <span className="text-muted ms-2">© 2025 All rights reserved</span>
          </div>
          
          <div className="d-flex gap-3">
            <Link to="/shipping-policy" className="text-white text-decoration-none">Shipping</Link>
            <a href="#" className="text-white text-decoration-none">Privacy</a>
            <a href="#" className="text-white text-decoration-none">Terms</a>
            <a href="#" className="text-white text-decoration-none">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;