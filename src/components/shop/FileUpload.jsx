import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
    onFileUpload(files);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6>Upload Design Files</h6>
      </div>
      <div className="card-body">
        <input
          type="file"
          className="form-control"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
          onChange={handleFileChange}
        />
        <small className="text-muted">
          Supported formats: JPG, PNG, PDF, AI, PSD (Max 10MB each)
        </small>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-3">
            <h6>Uploaded Files:</h6>
            <ul className="list-group">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  <span>{file.name}</span>
                  <small className="text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;