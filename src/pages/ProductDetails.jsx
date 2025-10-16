import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import CustomSizeForm from '../components/shop/CustomSizeForm';
import PriceCalculator from '../components/shop/PriceCalculator';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedOptions, setSelectedOptions] = useState({});

  if (!product) {
    return <div className="container mt-4"><h2>Product not found</h2></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="lead">₹{product.price.toLocaleString('en-IN')}</p>
          <p>{product.description}</p>
          
          <CustomSizeForm product={product} onOptionsChange={setSelectedOptions} />
          <PriceCalculator product={product} options={selectedOptions} />
          
          <button className="btn btn-primary btn-lg mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;