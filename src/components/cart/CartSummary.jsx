import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartSummary = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const subtotal = getCartTotal();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="card">
      <div className="card-header">
        <h5>Order Summary</h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <span>Subtotal ({cartItems.length} items):</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>GST (18%):</span>
          <span>₹{gst.toLocaleString('en-IN')}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;