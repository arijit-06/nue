import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // TODO: Replace with actual auth check
  // const { user, loading } = useAuth();
  
  // Mock admin check
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  
  // if (loading) {
  //   return <div className="d-flex justify-content-center mt-5">
  //     <div className="spinner-border" role="status"></div>
  //   </div>;
  // }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminRoute;