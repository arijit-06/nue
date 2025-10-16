import React from 'react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  return (
    <div className="row g-4">
      {products.map(product => (
        <div key={product.id} className="col-md-6 col-lg-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;