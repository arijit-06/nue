import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { calculateStoreFixtures } from '../utils/storeCalculator';
import { calculateEstimate } from '../utils/pricingCalculator';
import { formatForExcel } from '../utils/estimateFormatter';
import ClientDetailsForm from '../components/estimator/ClientDetailsForm';
import StoreSpecsForm from '../components/estimator/StoreSpecsForm';
import BrandingOptionsForm from '../components/estimator/BrandingOptionsForm';
import ResultsDisplay from '../components/estimator/ResultsDisplay';

const Estimator = () => {
  const [results, setResults] = useState(null);
  const [showAreaCalculator, setShowAreaCalculator] = useState(false);

  const cities = {
    tier1: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'],
    tier2: ['Jaipur', 'Lucknow', 'Indore', 'Chandigarh', 'Ahmedabad', 'Surat', 'Kochi', 'Coimbatore'],
    tier3: ['Agra', 'Bhopal', 'Guwahati', 'Kanpur', 'Nagpur', 'Patna', 'Vadodara', 'Visakhapatnam']
  };

  const validationSchema = Yup.object({
    storeName: Yup.string().required('Store name is required'),
    clientName: Yup.string().required('Your name is required'),
    contactNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Contact number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    storeAddress: Yup.string().required('Store address is required'),
    city: Yup.string().required('City is required'),
    storeArea: Yup.number().min(200, 'Minimum area is 200 sq. ft.').max(10000, 'Maximum area is 10000 sq. ft.').required('Store area is required'),
    storePerimeter: Yup.number().min(50, 'Minimum perimeter is 50 ft.').max(500, 'Maximum perimeter is 500 ft.').required('Store perimeter is required'),
    storeType: Yup.string().required('Store type is required'),
    signageType: Yup.string().required('Signage type is required'),
    campaignType: Yup.string().required('Campaign type is required')
  });

  const initialValues = {
    storeName: '',
    clientName: '',
    contactNumber: '',
    email: '',
    storeAddress: '',
    city: '',
    storeArea: '',
    storePerimeter: '',
    storeType: '',
    signageType: 'led',
    wallGraphics: true,
    campaignType: 'none',
    pillarWrapping: false,
    maintenanceContract: false
  };

  const handleSubmit = (values) => {
    try {
      // Calculate fixtures
      const fixtureData = calculateStoreFixtures({
        storeArea: values.storeArea,
        storePerimeter: values.storePerimeter,
        storeType: values.storeType,
        city: values.city
      });

      // Calculate pricing
      const pricingData = calculateEstimate(
        fixtureData,
        values.city,
        values.campaignType,
        { signageType: values.signageType }
      );

      // Format for Excel
      const excelData = formatForExcel(
        { fixtureData, pricingData },
        values
      );

      setResults({ fixtureData, pricingData, excelData });
      toast.success('Estimate generated successfully!');
    } catch (error) {
      toast.error('Error generating estimate. Please try again.');
    }
  };

  const AreaCalculatorModal = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [calculatedArea, setCalculatedArea] = useState(0);

    const calculateArea = () => {
      const area = parseFloat(length) * parseFloat(width);
      setCalculatedArea(area || 0);
    };

    return (
      <div className={`modal fade ${showAreaCalculator ? 'show d-block' : ''}`} style={{backgroundColor: showAreaCalculator ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Area Calculator</h5>
              <button type="button" className="btn-close" onClick={() => setShowAreaCalculator(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Length (ft)</label>
                  <input type="number" className="form-control" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="form-label">Width (ft)</label>
                  <input type="number" className="form-control" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div className="col-12 text-center">
                  <button type="button" className="btn btn-primary" onClick={calculateArea}>Calculate</button>
                  <div className="mt-3">
                    <h4>Area: {calculatedArea} sq. ft.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">NEU Store Branding Estimator</h2>
          
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, isValid }) => {
              const completionPercentage = Math.round((Object.values(values).filter(v => v !== '' && v !== false).length / Object.keys(values).length) * 100);
              
              return (
                <Form>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Form Completion</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{width: `${completionPercentage}%`}}></div>
                    </div>
                  </div>

                  {/* Section 1: Client Details */}
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
                          <Field name="contactNumber" type="tel" className="form-control" placeholder="10-digit mobile number" />
                          <ErrorMessage name="contactNumber" component="div" className="text-danger small" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email *</label>
                          <Field name="email" type="email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="text-danger small" />
                        </div>
                        <div className="col-md-8">
                          <label className="form-label">Store Address *</label>
                          <Field name="storeAddress" as="textarea" rows="2" className="form-control" />
                          <ErrorMessage name="storeAddress" component="div" className="text-danger small" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">City *</label>
                          <Field name="city" as="select" className="form-select">
                            <option value="">Select City</option>
                            <optgroup label="Tier 1 Cities">
                              {cities.tier1.map(city => <option key={city} value={city}>{city}</option>)}
                            </optgroup>
                            <optgroup label="Tier 2 Cities">
                              {cities.tier2.map(city => <option key={city} value={city}>{city}</option>)}
                            </optgroup>
                            <optgroup label="Tier 3 Cities">
                              {cities.tier3.map(city => <option key={city} value={city}>{city}</option>)}
                            </optgroup>
                          </Field>
                          <ErrorMessage name="city" component="div" className="text-danger small" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Store Specifications */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5>Store Specifications</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Store Area (sq. ft.) *</label>
                          <Field name="storeArea" type="number" className="form-control" min="200" max="10000" />
                          <ErrorMessage name="storeArea" component="div" className="text-danger small" />
                          <small className="text-muted">Not sure? <button type="button" className="btn btn-link p-0" onClick={() => setShowAreaCalculator(true)}>Use area calculator →</button></small>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Store Perimeter (linear ft.) *</label>
                          <Field name="storePerimeter" type="number" className="form-control" min="50" max="500" />
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

                  {/* Section 3: Branding Requirements */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5>Branding Requirements</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Signage Type *</label>
                          <div>
                            <div className="form-check">
                              <Field name="signageType" type="radio" value="led" className="form-check-input" />
                              <label className="form-check-label">LED Signage</label>
                            </div>
                            <div className="form-check">
                              <Field name="signageType" type="radio" value="nonLed" className="form-check-input" />
                              <label className="form-check-label">Non-LED Signage</label>
                            </div>
                            <div className="form-check">
                              <Field name="signageType" type="radio" value="none" className="form-check-input" />
                              <label className="form-check-label">No Signage</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Wall Graphics</label>
                          <div className="form-check">
                            <Field name="wallGraphics" type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Include Wall Graphics</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Campaign Setup *</label>
                          <Field name="campaignType" as="select" className="form-select">
                            <option value="none">No Campaign</option>
                            <option value="seasonal">Seasonal Campaign</option>
                            <option value="launch">Launch Campaign</option>
                            <option value="standard">Standard Promotion</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Additional Options */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5>Additional Options</h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-check">
                            <Field name="pillarWrapping" type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Pillar Wrapping</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <Field name="maintenanceContract" type="checkbox" className="form-check-input" />
                            <label className="form-check-label">Maintenance Contract (6 months/1 year)</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mb-4">
                    <button type="submit" className="btn btn-primary btn-lg px-5" disabled={!isValid}>
                      Generate Estimate
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/* Results Section */}
          {results && (
            <div className="card mt-5">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">Your Estimate is Ready!</h4>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <h2 className="display-4 text-primary fw-bold">
                    ₹{results.pricingData.summary.grandTotal.toLocaleString('en-IN')}
                  </h2>
                  <p className="lead">Total Project Cost (Including GST)</p>
                </div>

                <div className="accordion" id="estimateAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#fixtureBreakdown">
                        Fixture Breakdown
                      </button>
                    </h2>
                    <div id="fixtureBreakdown" className="accordion-collapse collapse show" data-bs-parent="#estimateAccordion">
                      <div className="accordion-body">
                        <div className="row">
                          {Object.entries(results.pricingData.breakdown.fixtures)
                            .filter(([key, item]) => item.qty > 0)
                            .map(([key, item]) => (
                              <div key={key} className="col-md-6 mb-2">
                                <div className="d-flex justify-content-between">
                                  <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} ({item.qty})</span>
                                  <span>₹{item.total.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pricingDetails">
                        Pricing Details
                      </button>
                    </h2>
                    <div id="pricingDetails" className="accordion-collapse collapse" data-bs-parent="#estimateAccordion">
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-md-6">
                            <h6>Branding</h6>
                            <p>Signage: ₹{results.pricingData.breakdown.branding.signage.total.toLocaleString('en-IN')}</p>
                            <p>Wall Graphics: ₹{results.pricingData.breakdown.branding.wallGraphics.total.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="col-md-6">
                            <h6>Summary</h6>
                            <p>Subtotal: ₹{results.pricingData.summary.subtotal.toLocaleString('en-IN')}</p>
                            <p>GST (18%): ₹{results.pricingData.summary.gst.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#paymentSchedule">
                        Payment Schedule
                      </button>
                    </h2>
                    <div id="paymentSchedule" className="accordion-collapse collapse" data-bs-parent="#estimateAccordion">
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-md-4 text-center">
                            <h6>Advance (25%)</h6>
                            <p className="h5 text-primary">₹{results.pricingData.paymentSchedule.advance25.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <h6>Before Installation (50%)</h6>
                            <p className="h5 text-warning">₹{results.pricingData.paymentSchedule.beforeInstallation50.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="col-md-4 text-center">
                            <h6>After Completion (25%)</h6>
                            <p className="h5 text-success">₹{results.pricingData.paymentSchedule.afterCompletion25.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-outline-primary me-3" disabled>
                    Download Estimate (PDF)
                  </button>
                  <button className="btn btn-success" disabled>
                    Request Final Quote
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <AreaCalculatorModal />
    </div>
  );
};

export default Estimator;