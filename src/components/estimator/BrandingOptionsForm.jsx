import React from 'react';
import { Field } from 'formik';

const BrandingOptionsForm = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Branding Options</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Signage Type</label>
            <div>
              <div className="form-check">
                <Field name="signageType" type="radio" value="led" className="form-check-input" />
                <label className="form-check-label">LED Signage</label>
              </div>
              <div className="form-check">
                <Field name="signageType" type="radio" value="nonLed" className="form-check-input" />
                <label className="form-check-label">Non-LED Signage</label>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Campaign Type</label>
            <Field name="campaignType" as="select" className="form-select">
              <option value="none">No Campaign</option>
              <option value="seasonal">Seasonal Campaign</option>
              <option value="launch">Launch Campaign</option>
              <option value="standard">Standard Promotion</option>
            </Field>
          </div>
          <div className="col-md-4">
            <div className="form-check">
              <Field name="wallGraphics" type="checkbox" className="form-check-input" />
              <label className="form-check-label">Include Wall Graphics</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingOptionsForm;