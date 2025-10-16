import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Admin Dashboard</h2>
          <div className="alert alert-info">
            <h4>Welcome to Admin Panel</h4>
            <p>This is a placeholder for the admin dashboard. Features to be implemented:</p>
            <ul>
              <li>Order Management</li>
              <li>User Management</li>
              <li>Product Management</li>
              <li>Analytics & Reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;