import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="col-md-4">
          <CartSummary />
          <Link to="/checkout" className="btn btn-primary w-100 mt-3">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;