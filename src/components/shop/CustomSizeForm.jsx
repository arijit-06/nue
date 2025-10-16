import React, { useState } from 'react';

const CustomSizeForm = ({ product, onOptionsChange }) => {
  const [customSize, setCustomSize] = useState({
    length: '',
    width: '',
    height: ''
  });

  const handleSizeChange = (field, value) => {
    const newSize = { ...customSize, [field]: value };
    setCustomSize(newSize);
    onOptionsChange({ customSize: newSize });
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6>Customize Size</h6>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Length (ft)</label>
            <input
              type="number"
              className="form-control"
              value={customSize.length}
              onChange={(e) => handleSizeChange('length', e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Width (ft)</label>
            <input
              type="number"
              className="form-control"
              value={customSize.width}
              onChange={(e) => handleSizeChange('width', e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Height (ft)</label>
            <input
              type="number"
              className="form-control"
              value={customSize.height}
              onChange={(e) => handleSizeChange('height', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSizeForm;