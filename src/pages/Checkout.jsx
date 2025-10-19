import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { razorpayOptions, RAZORPAY_KEY_ID } from '../config/razorpay';

const Checkout = () => {
  const { items, itemCount, subtotal, gst, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required')
  });

  const handlePayment = (values) => {
    if (!currentUser) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    setProcessing(true);

    const orderId = `ORD-${Date.now()}`;
    const customerDetails = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone
    };

    const options = razorpayOptions(
      total,
      orderId,
      customerDetails,
      // Success handler
      (response) => {
        console.log('Payment successful:', response);
        
        // Save order to localStorage for now
        const orderData = {
          orderId,
          paymentId: response.razorpay_payment_id,
          customerDetails: {
            ...customerDetails,
            address: values.address,
            city: values.city,
            pincode: values.pincode
          },
          items,
          billing: { subtotal, gst, total },
          status: 'paid',
          createdAt: new Date().toISOString()
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        clearCart();
        toast.success('Payment successful!');
        navigate(`/order-success?orderId=${orderId}`);
        setProcessing(false);
      },
      // Failure handler
      () => {
        toast.error('Payment cancelled');
        setProcessing(false);
      }
    );

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>Your cart is empty</h4>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-7">
          <div className="card p-4">
            <h4 className="mb-3">Billing Details</h4>
            
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: currentUser?.email || '',
                phone: '',
                address: '',
                city: '',
                pincode: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handlePayment}
            >
              <Form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <Field name="firstName" type="text" className="form-control" />
                    <ErrorMessage name="firstName" component="div" className="text-danger small" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <Field name="lastName" type="text" className="form-control" />
                    <ErrorMessage name="lastName" component="div" className="text-danger small" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email *</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone *</label>
                    <Field name="phone" type="tel" className="form-control" placeholder="9876543210" />
                    <ErrorMessage name="phone" component="div" className="text-danger small" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address *</label>
                    <Field name="address" as="textarea" rows="3" className="form-control" />
                    <ErrorMessage name="address" component="div" className="text-danger small" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <Field name="city" type="text" className="form-control" />
                    <ErrorMessage name="city" component="div" className="text-danger small" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pincode *</label>
                    <Field name="pincode" type="text" className="form-control" placeholder="400001" />
                    <ErrorMessage name="pincode" component="div" className="text-danger small" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 mt-4"
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </button>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card p-4">
            <h4 className="mb-3">Order Summary</h4>
            
            {items.map(item => (
              <div key={item.id} className="mb-3 pb-3 border-bottom">
                <h6>{item.productName}</h6>
                <small className="text-muted">
                  {item.dimensions.length} × {item.dimensions.width} ft | Qty: {item.quantity}
                </small>
                <div className="fw-bold">₹{item.itemTotal.toLocaleString('en-IN')}</div>
              </div>
            ))}

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>GST (18%):</span>
              <span>₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;