import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Estimator from './pages/Estimator';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import FirebaseTest from './pages/FirebaseTest';
import ShippingPolicy from './pages/ShippingPolicy';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrderDetails from './pages/admin/OrderDetails';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="estimate" element={<Estimator />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="firebase-test" element={<FirebaseTest />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          
          {/* Protected Routes */}
          <Route 
            path="checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="admin/orders/:orderId" 
            element={
              <AdminRoute>
                <OrderDetails />
              </AdminRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
