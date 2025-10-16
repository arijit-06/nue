import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: '📋',
      title: 'Share Store Details',
      description: 'Tell us about your store, location, and branding requirements'
    },
    {
      icon: '🧮',
      title: 'Get Instant Estimate',
      description: 'Receive a detailed quote within minutes based on your needs'
    },
    {
      icon: '✅',
      title: 'Approve & We Execute',
      description: 'Once approved, our team handles everything from design to installation'
    }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted">Simple 3-step process to transform your store</p>
          </div>
        </div>
        <div className="row">
          {steps.map((step, index) => (
            <div key={index} className="col-12 col-md-4 mb-4">
              <div className="text-center">
                <div className="position-relative mb-4">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                    <span className="display-6">{step.icon}</span>
                  </div>
                  <div className="position-absolute top-50 start-100 translate-middle-y text-primary fw-bold" style={{fontSize: '2rem'}}>
                    {index < steps.length - 1 && '→'}
                  </div>
                </div>
                <h4 className="fw-bold mb-3">{step.title}</h4>
                <p className="text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;