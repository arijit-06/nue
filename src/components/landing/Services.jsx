import React from 'react';

const Services = () => {
  const services = [
    {
      icon: '🎨',
      title: 'Store Branding',
      description: 'Logo design, signage, and wall graphics that make your store stand out from the competition.'
    },
    {
      icon: '🎄',
      title: 'Seasonal Campaigns',
      description: 'Festive displays and promotional setups that drive seasonal sales and customer engagement.'
    },
    {
      icon: '🛍️',
      title: 'Product Display Systems',
      description: 'Custom gondolas, racks, and counters designed to maximize product visibility and sales.'
    },
    {
      icon: '🔧',
      title: 'Maintenance & Updates',
      description: 'Regular repairs and refresh services to keep your store looking fresh and professional.'
    }
  ];

  return (
    <section id="services" className="py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Our Services</h2>
            <p className="lead text-muted">Complete store transformation solutions</p>
          </div>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">{service.icon}</div>
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                  <a href="#contact" className="btn btn-outline-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;