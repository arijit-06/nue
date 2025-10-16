import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="container mt-4">
      <div className="text-center">
        <div className="mb-4">
          <i className="bi bi-check-circle text-success" style={{fontSize: '4rem'}}></i>
        </div>
        <h2 className="text-success mb-3">Order Confirmed!</h2>
        <p className="lead mb-4">Thank you for your order. We'll send you a confirmation email shortly.</p>
        
        <div className="card mx-auto" style={{maxWidth: '500px'}}>
          <div className="card-body">
            <h5>Order Details</h5>
            <p><strong>Order ID:</strong> NEU-2025-001</p>
            <p><strong>Estimated Delivery:</strong> 7-10 business days</p>
            <p><strong>Total Amount:</strong> ₹25,000</p>
          </div>
        </div>
        
        <div className="mt-4">
          <Link to="/shop" className="btn btn-primary me-3">Continue Shopping</Link>
          <Link to="/dashboard" className="btn btn-outline-primary">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;