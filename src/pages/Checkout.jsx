import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartState, placeOrder } = useCart();
  const { currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required')
  });

  const handleSubmit = async (values) => {
    if (!currentUser) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    if (cartState.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderId = await placeOrder(values, paymentMethod, currentUser);
      navigate(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <Formik
            initialValues={{
              email: currentUser?.email || '',
              firstName: '',
              lastName: '',
              phone: '',
              address: '',
              city: '',
              pincode: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Shipping Information</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <Field name="email" type="email" className="form-control" placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>
                    <div className="col-12">
                      <Field name="phone" type="tel" className="form-control" placeholder="Phone Number" />
                      <ErrorMessage name="phone" component="div" className="text-danger small" />
                    </div>
                    <div className="col-md-6">
                      <Field name="firstName" type="text" className="form-control" placeholder="First Name" />
                      <ErrorMessage name="firstName" component="div" className="text-danger small" />
                    </div>
                    <div className="col-md-6">
                      <Field name="lastName" type="text" className="form-control" placeholder="Last Name" />
                      <ErrorMessage name="lastName" component="div" className="text-danger small" />
                    </div>
                    <div className="col-12">
                      <Field name="address" type="text" className="form-control" placeholder="Address" />
                      <ErrorMessage name="address" component="div" className="text-danger small" />
                    </div>
                    <div className="col-md-6">
                      <Field name="city" type="text" className="form-control" placeholder="City" />
                      <ErrorMessage name="city" component="div" className="text-danger small" />
                    </div>
                    <div className="col-md-6">
                      <Field name="pincode" type="text" className="form-control" placeholder="Pincode" />
                      <ErrorMessage name="pincode" component="div" className="text-danger small" />
                    </div>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn btn-success btn-lg w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </Form>
          </Formik>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Order Summary</h5>
            </div>
            <div className="card-body">
              {cartState.items.length > 0 ? (
                <>
                  {cartState.items.map((item, index) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <div>
                        <small className="text-muted">{item.productName}</small>
                        <br />
                        <small>{item.dimensions.length}×{item.dimensions.width} ft</small>
                      </div>
                      <span>₹{item.itemTotal}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>₹{cartState.subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>GST (18%):</span>
                    <span>₹{cartState.gst}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>₹{cartState.total}</span>
                  </div>
                </>
              ) : (
                <p className="text-muted">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;