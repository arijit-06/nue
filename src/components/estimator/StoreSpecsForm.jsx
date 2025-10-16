import React from 'react';
import { Field, ErrorMessage } from 'formik';

const StoreSpecsForm = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Store Specifications</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Store Area (sq. ft.) *</label>
            <Field name="storeArea" type="number" className="form-control" />
            <ErrorMessage name="storeArea" component="div" className="text-danger small" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Store Perimeter (linear ft.) *</label>
            <Field name="storePerimeter" type="number" className="form-control" />
            <ErrorMessage name="storePerimeter" component="div" className="text-danger small" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Store Type *</label>
            <Field name="storeType" as="select" className="form-select">
              <option value="">Select Type</option>
              <option value="grocery">Grocery</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="general">General</option>
            </Field>
            <ErrorMessage name="storeType" component="div" className="text-danger small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSpecsForm;