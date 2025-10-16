import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Estimator from './pages/Estimator';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="estimate" element={<Estimator />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success" element={<OrderConfirmation />} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;