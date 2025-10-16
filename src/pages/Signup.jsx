import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // TODO: Replace with actual Firebase auth
      // await signup(values.email, values.password, {
      //   name: values.fullName,
      //   phone: values.phone
      // });
      
      // Mock signup for now
      console.log('Signup data:', {
        email: values.email,
        name: values.fullName,
        phone: values.phone
      });
      
      toast.success('Account created successfully!');
      navigate('/shop');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Create Account</h3>
              
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <Field
                      name="fullName"
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <Field
                      name="phone"
                      type="tel"
                      className="form-control"
                      placeholder="10-digit phone number"
                    />
                    <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter password (min 6 characters)"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none">
                      Login
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;