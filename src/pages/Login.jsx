import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { login, resetPassword, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    console.log('Login attempt:', values.email);
    
    try {
      await login(values.email, values.password);
      
      console.log('Login successful');
      navigate(isAdmin ? '/admin/dashboard' : '/shop');
    } catch (error) {
      console.error('Login form error:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (email) => {
    if (!email) {
      alert('Please enter your email address first');
      return;
    }
    
    try {
      await resetPassword(email);
      setShowReset(false);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">Login</h2>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                      placeholder="your@email.com"
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                      placeholder="Enter password"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>

                  <div className="text-center">
                    <Button 
                      variant="link" 
                      size="sm"
                      onClick={() => handleResetPassword(values.email)}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <hr />

                  <p className="text-center mb-0">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
