import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, gst, total, updateQuantity, removeFromCart } = useCart();

  // Empty Cart Case
  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-cart-x" style={{fontSize: '4rem'}}></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <p className="text-muted">Browse our products and add items to your cart</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
          Shop Now
        </button>
      </div>
    );
  }

  // Cart with Items
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Shopping Cart ({itemCount} items)</h2>
          
          {items.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h5>{item.productName}</h5>
                    <p className="text-muted mb-1">
                      <strong>Dimensions:</strong> {item.dimensions.length} ft × {item.dimensions.width} ft
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Area:</strong> {item.area} sq.ft
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Price:</strong> ₹{item.pricePerSqft}/sq.ft × {item.area} sq.ft = ₹{(item.pricePerSqft * item.area).toLocaleString('en-IN')}
                    </p>
                    {item.artworkFileName && (
                      <p className="text-muted mb-0">
                        <strong>Artwork:</strong> {item.artworkFileName}
                      </p>
                    )}
                  </div>
                  
                  <div className="col-md-4 text-end">
                    {/* Quantity Controls */}
                    <div className="d-flex justify-content-end align-items-center mb-3">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <h5 className="text-primary mb-3">₹{item.itemTotal.toLocaleString('en-IN')}</h5>
                    
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          {/* Sticky Cart Summary */}
          <div className="card sticky-top" style={{top: '20px'}}>
            <div className="card-body">
              <h4 className="mb-3">Order Summary</h4>
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>GST (18%):</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">₹{total.toLocaleString('en-IN')}</strong>
              </div>
              
              <button 
                className="btn btn-primary btn-lg w-100 mb-2"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;