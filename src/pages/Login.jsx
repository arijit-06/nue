import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // TODO: Replace with actual Firebase auth
      // await login(values.email, values.password);
      
      // Mock authentication for now
      if (values.email === 'admin@neu.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/shop');
      }
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
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
              <h3 className="text-center mb-4">Login to Your Account</h3>
              
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
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
                    <label className="form-label">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3 text-end">
                    <Link to="/forgot-password" className="text-decoration-none small">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" className="text-decoration-none">
                      Sign up
                    </Link>
                  </div>

                  <hr className="my-3" />

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    disabled={loading}
                  >
                    <i className="bi bi-google me-2"></i>
                    Sign in with Google
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;