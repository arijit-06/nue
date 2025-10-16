import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { getCartItemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'bg-dark bg-opacity-90' : 'bg-transparent'}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">NEU</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/estimate') ? 'active' : ''}`} to="/estimate">Get Estimate</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/shop') ? 'active' : ''}`} to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#portfolio" onClick={() => location.pathname === '/' && document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}>Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={() => location.pathname === '/' && document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>Contact</a>
            </li>
          </ul>
          
          <div className="d-flex">
            <Link className="btn btn-outline-light position-relative" to="/cart">
              🛒
              {getCartItemCount() > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartItemCount()}
                </span>
              ) : (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{opacity: 0.5}}>
                  0
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;