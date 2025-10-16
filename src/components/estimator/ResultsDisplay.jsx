import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  return (
    <div className="card mt-5">
      <div className="card-header bg-success text-white">
        <h4 className="mb-0">Your Estimate is Ready!</h4>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <h2 className="display-4 text-primary fw-bold">
            ₹{results.pricingData?.summary?.grandTotal?.toLocaleString('en-IN') || '0'}
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
            <div id="fixtureBreakdown" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <p>Detailed fixture breakdown will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;