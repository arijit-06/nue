import React from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    console.log('Form submitted:', values.email);
    
    try {
      await signup(values.email, values.password, {
        name: values.name,
        phone: values.phone
      });
      
      console.log('Signup successful, navigating to shop');
      navigate('/shop');
    } catch (error) {
      console.error('Signup form error:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">Create Account</h2>
            
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && errors.name}
                      placeholder="John Doe"
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

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
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={touched.phone && errors.phone}
                      placeholder="9876543210"
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                      placeholder="Min 6 characters"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={touched.confirmPassword && errors.confirmPassword}
                      placeholder="Confirm password"
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <p className="text-center mb-0">
                    Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
