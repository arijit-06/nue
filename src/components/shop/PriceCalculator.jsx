import React, { useState, useEffect } from 'react';

const PriceCalculator = ({ product, options }) => {
  const [calculatedPrice, setCalculatedPrice] = useState(product.price);

  useEffect(() => {
    let price = product.price;
    
    // Calculate custom size pricing
    if (options.customSize) {
      const { length, width, height } = options.customSize;
      if (length && width && height) {
        const volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        const standardVolume = 4 * 2 * 5.5; // Standard gondola size
        const multiplier = volume / standardVolume;
        price = Math.round(product.price * multiplier);
      }
    }
    
    setCalculatedPrice(price);
  }, [product.price, options]);

  return (
    <div className="card">
      <div className="card-header">
        <h6>Price Calculation</h6>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <span>Base Price:</span>
          <span>₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        {options.customSize && (
          <div className="d-flex justify-content-between">
            <span>Custom Size Adjustment:</span>
            <span>₹{(calculatedPrice - product.price).toLocaleString('en-IN')}</span>
          </div>
        )}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total Price:</span>
          <span className="text-primary">₹{calculatedPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;