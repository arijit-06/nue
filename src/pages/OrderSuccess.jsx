import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container py-5">
      <div className="text-center">
        <div className="card p-5">
          <div style={{ fontSize: '4rem' }}>✅</div>
          <h2 className="mt-3">Order Placed Successfully!</h2>
          <p className="text-muted">Your order ID: <strong>{orderId}</strong></p>
          <p>We'll send updates to your email.</p>
          
          <div className="mt-4">
            <button 
              className="btn btn-primary me-2" 
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => navigate('/dashboard')}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;