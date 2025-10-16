import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    storeName: Yup.string().required('Store name is required'),
    city: Yup.string().required('City is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form Data:', values);
    toast.success("We'll contact you within 24 hours!");
    resetForm();
  };

  return (
    <section id="contact" className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Get In Touch</h2>
            <p className="lead text-muted">Ready to transform your store? Let's discuss your project</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                storeName: '',
                city: '',
                message: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Field name="name" type="text" className="form-control" placeholder="Your Name" />
                    <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-md-6">
                    <Field name="email" type="email" className="form-control" placeholder="Email Address" />
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-md-6">
                    <Field name="phone" type="tel" className="form-control" placeholder="Phone Number" />
                    <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-md-6">
                    <Field name="storeName" type="text" className="form-control" placeholder="Store Name" />
                    <ErrorMessage name="storeName" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-12">
                    <Field name="city" type="text" className="form-control" placeholder="City" />
                    <ErrorMessage name="city" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-12">
                    <Field name="message" as="textarea" rows="4" className="form-control" placeholder="Tell us about your project requirements..." />
                    <ErrorMessage name="message" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary btn-lg px-5">Send Message</button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;