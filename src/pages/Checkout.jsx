import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().required('Pincode is required')
  });

  const handleSubmit = (values) => {
    // Process order
    navigate('/order-success');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
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
              
              <button type="submit" className="btn btn-success btn-lg w-100">
                Place Order
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
              <p>Order summary will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;