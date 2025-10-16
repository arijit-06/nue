import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ClientDetailsForm = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Client Details</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Store Name *</label>
            <Field name="storeName" type="text" className="form-control" />
            <ErrorMessage name="storeName" component="div" className="text-danger small" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Your Name *</label>
            <Field name="clientName" type="text" className="form-control" />
            <ErrorMessage name="clientName" component="div" className="text-danger small" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Number *</label>
            <Field name="contactNumber" type="tel" className="form-control" />
            <ErrorMessage name="contactNumber" component="div" className="text-danger small" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsForm;