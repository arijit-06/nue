import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { itemCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Smooth scroll to sections (only on home page)
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get display name (email username or full email)
  const getDisplayName = () => {
    if (!currentUser) return 'User';
    return currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          NEU
        </Link>
        
        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Navigation Links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/estimate') ? 'active fw-bold' : ''}`} 
                to="/estimate"
              >
                Get Estimate
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/shop') ? 'active fw-bold' : ''}`} 
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => scrollToSection('portfolio')}
              >
                Portfolio
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
          
          {/* Right Side: Cart & Auth */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart Icon with Badge */}
            <Link 
              className="btn btn-outline-light position-relative" 
              to="/cart"
              style={{ minWidth: '50px' }}
            >
              <i className="bi bi-cart3"></i>
              {itemCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.7rem' }}
                >
                  {itemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>

            {/* Authentication Section */}
            {!currentUser ? (
              // Not logged in - Show Login button
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            ) : (
              // Logged in - Show User Dropdown
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                  type="button" 
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                  <span className="d-none d-md-inline">{getDisplayName()}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li className="px-3 py-2 border-bottom">
                    <small className="text-muted d-block">Signed in as</small>
                    <strong className="d-block text-truncate" style={{ maxWidth: '200px' }}>
                      {currentUser.email}
                    </strong>
                  </li>
                  
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="bi bi-bag-check me-2"></i>
                      My Orders
                    </Link>
                  </li>
                  
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>
                  
                  {/* Admin Panel Link - Only show if user is admin */}
                  {isAdmin && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link className="dropdown-item text-primary fw-bold" to="/admin/dashboard">
                          <i className="bi bi-shield-lock me-2"></i>
                          Admin Panel
                        </Link>
                      </li>
                    </>
                  )}
                  
                  <li><hr className="dropdown-divider" /></li>
                  
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
