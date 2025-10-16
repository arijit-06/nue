import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img src={item.image} alt={item.name} className="img-fluid" />
          </div>
          <div className="col-md-4">
            <h6>{item.name}</h6>
            <small className="text-muted">{item.category}</small>
          </div>
          <div className="col-md-2">
            <div className="input-group">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <input 
                type="text" 
                className="form-control text-center" 
                value={item.quantity} 
                readOnly 
              />
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
          <div className="col-md-2">
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
  );
};

export default CartItem;