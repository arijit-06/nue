import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-2">StoreBrand Pro</h5>
            <p className="mb-0 text-muted">Transforming stores, building brands, creating success.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="mb-3">
              <a href="#" className="text-white me-3" aria-label="Facebook">📘</a>
              <a href="#" className="text-white me-3" aria-label="Instagram">📷</a>
              <a href="#" className="text-white me-3" aria-label="LinkedIn">💼</a>
              <a href="#" className="text-white" aria-label="Twitter">🐦</a>
            </div>
            <p className="mb-0 text-muted small">© 2024 StoreBrand Pro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;