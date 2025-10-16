import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock auth state - replace with actual auth context
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

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
          
          <div className="d-flex align-items-center gap-2">
            {/* Cart Icon */}
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

            {/* Auth Section */}
            {!isAuthenticated ? (
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            ) : (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  {userName}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  {userRole === 'admin' && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/admin/dashboard">Admin Panel</Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
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