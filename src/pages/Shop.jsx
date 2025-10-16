import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #0d6efd, #6c757d)'}}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold mb-3">Shop Our Products</h1>
              <p className="lead">Custom-sized branding solutions delivered to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-pills justify-content-center">
                {categories.map(category => (
                  <li key={category.id} className="nav-item">
                    <button 
                      className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{height: '200px', objectFit: 'cover'}}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted small" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-primary mb-0">₹{product.pricePerSqft}/sq.ft</span>
                      </div>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-primary w-100"
                      >
                        Customize & Order
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;