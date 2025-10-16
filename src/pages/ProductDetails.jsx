import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);
  
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [artworkFile, setArtworkFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculations
  const area = length && width ? parseFloat(length) * parseFloat(width) : 0;
  const price = area * (product?.pricePerSqft || 0);
  const totalPrice = price * quantity;

  // Validation
  const isLengthValid = length && parseFloat(length) >= product?.minSize.length && parseFloat(length) <= product?.maxSize.length;
  const isWidthValid = width && parseFloat(width) >= product?.minSize.width && parseFloat(width) <= product?.maxSize.width;
  const isQuantityValid = quantity >= 1;
  const isArtworkValid = artworkFile !== null;
  const isFormValid = isLengthValid && isWidthValid && isQuantityValid && isArtworkValid;

  if (!product) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <h2>Product not found</h2>
          <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArtworkFile(file);
    }
  };

  const handleAddToCart = () => {
    if (!isFormValid) return;
    
    addToCart(
      product,
      { length: parseFloat(length), width: parseFloat(width) },
      quantity,
      artworkFile
    );
    
    setShowSuccess(true);
    // Reset form
    setLength('');
    setWidth('');
    setQuantity(1);
    setArtworkFile(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Column - Product Info */}
        <div className="col-md-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="img-fluid rounded mb-4"
            style={{width: '100%', height: '400px', objectFit: 'cover'}}
          />
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <p className="h4 text-primary">₹{product.pricePerSqft}/sq.ft</p>
          
          <h5>Features:</h5>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Right Column - Customization Form */}
        <div className="col-md-6">
          <div className="card p-4">
            <h4 className="mb-4">Customize Your Order</h4>
            
            {/* Size Input Section */}
            <div className="mb-3">
              <label className="form-label">Length (ft)</label>
              <input
                type="number"
                className={`form-control ${length && !isLengthValid ? 'is-invalid' : ''}`}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={product.minSize.length}
                max={product.maxSize.length}
              />
              <small className="text-muted">
                Min: {product.minSize.length}ft, Max: {product.maxSize.length}ft
              </small>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Width (ft)</label>
              <input
                type="number"
                className={`form-control ${width && !isWidthValid ? 'is-invalid' : ''}`}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min={product.minSize.width}
                max={product.maxSize.width}
              />
              <small className="text-muted">
                Min: {product.minSize.width}ft, Max: {product.maxSize.width}ft
              </small>
            </div>

            {/* Real-time Calculation Display */}
            {area > 0 && (
              <div className="alert alert-info">
                <strong>Area:</strong> {area} sq.ft<br/>
                <strong>Price:</strong> ₹{price.toLocaleString('en-IN')}
              </div>
            )}

            {/* Quantity Input */}
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Total Price Display */}
            {totalPrice > 0 && (
              <h4 className="text-success mb-3">Total: ₹{totalPrice.toLocaleString('en-IN')}</h4>
            )}

            {/* File Upload Section */}
            <div className="mb-4">
              <label className="form-label">Upload Artwork File *</label>
              <input
                type="file"
                className="form-control"
                accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
                onChange={handleFileSelect}
              />
              <small className="text-muted">
                Supported: JPG, PNG, PDF, AI, PSD (Max 10MB)
              </small>
              {artworkFile && (
                <div className="mt-2">
                  <small className="text-success">✓ {artworkFile.name}</small>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleAddToCart}
              disabled={!isFormValid}
            >
              Add to Cart
            </button>
            
            {/* Success Message */}
            {showSuccess && (
              <div className="mt-3">
                <div className="alert alert-success">
                  Item added to cart successfully!
                </div>
                <div className="d-flex gap-2">
                  <Link to="/shop" className="btn btn-outline-primary flex-fill">
                    Continue Shopping
                  </Link>
                  <Link to="/cart" className="btn btn-primary flex-fill">
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;