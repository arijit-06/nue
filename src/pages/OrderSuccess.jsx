import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body p-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{fontSize: '4rem'}}></i>
              </div>
              <h2 className="text-success mb-3">Order Placed Successfully!</h2>
              {orderId && (
                <div className="mb-4">
                  <p className="mb-2">Your Order ID:</p>
                  <h4 className="text-primary">{orderId}</h4>
                </div>
              )}
              <p className="text-muted mb-4">
                Thank you for your order! We'll send you an email confirmation shortly.
                Our team will review your artwork and contact you if any changes are needed.
              </p>
              <div className="d-grid gap-2">
                <Link to="/dashboard" className="btn btn-primary">
                  View Order History
                </Link>
                <Link to="/shop" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;