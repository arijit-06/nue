import React from 'react';

const Portfolio = () => {
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      client: 'Fresh Mart',
      type: 'Grocery Store',
      city: 'Mumbai'
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
      client: 'Style Hub',
      type: 'Fashion Retail',
      city: 'Delhi'
    },
    {
      image: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      client: 'Tech Zone',
      type: 'Electronics Store',
      city: 'Bangalore'
    },
    {
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      client: 'Book Corner',
      type: 'Bookstore',
      city: 'Pune'
    },
    {
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      client: 'Cafe Delight',
      type: 'Restaurant',
      city: 'Chennai'
    }
  ];

  return (
    <section id="portfolio" className="py-5 bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="display-5 fw-bold mb-3">Our Portfolio</h2>
            <p className="lead text-muted">Successful store transformations across India</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div id="portfolioCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
              <div className="carousel-inner">
                {projects.map((project, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={project.image} className="d-block w-100" alt={project.client} style={{height: '400px', objectFit: 'cover'}} />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                      <h5>{project.client} | {project.type} | {project.city}</h5>
                    </div>
                  </div>
                ))}\n              </div>\n              <button className=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#portfolioCarousel\" data-bs-slide=\"prev\">\n                <span className=\"carousel-control-prev-icon\"></span>\n              </button>\n              <button className=\"carousel-control-next\" type=\"button\" data-bs-target=\"#portfolioCarousel\" data-bs-slide=\"next\">\n                <span className=\"carousel-control-next-icon\"></span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default Portfolio;"