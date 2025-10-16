import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Mock order data - replace with Firestore fetch
    const mockOrder = {
      id: orderId,
      customerName: 'Rajesh Kumar',
      customerEmail: 'rajesh@example.com',
      customerPhone: '+91 9876543210',
      customerAddress: '123 Business Street, Mumbai, Maharashtra 400001',
      orderDate: '2025-01-15',
      status: 'pending',
      amount: 25000,
      items: [
        {
          id: 1,
          productName: 'Wall Graphics',
          dimensions: { length: 10, width: 8 },
          area: 80,
          quantity: 1,
          pricePerSqft: 350,
          itemTotal: 28000,
          artworkFileName: 'wall_design.pdf'
        },
        {
          id: 2,
          productName: 'Door Branding',
          dimensions: { length: 6, width: 8 },
          area: 48,
          quantity: 2,
          pricePerSqft: 700,
          itemTotal: 67200,
          artworkFileName: 'door_design.ai'
        }
      ],
      subtotal: 95200,
      gst: 17136,
      total: 112336,
      artworkFiles: [
        { name: 'wall_design.pdf', size: '2.5 MB', uploadDate: '2025-01-15' },
        { name: 'door_design.ai', size: '5.1 MB', uploadDate: '2025-01-15' },
        { name: 'logo.png', size: '1.2 MB', uploadDate: '2025-01-15' }
      ],
      orderNotes: 'Customer requested rush delivery. Special color requirements mentioned in artwork files.'
    };

    setOrder(mockOrder);
    setNewStatus(mockOrder.status);
    setNotes(mockOrder.orderNotes || '');
  }, [orderId]);

  const handleStatusUpdate = () => {
    if (newStatus !== order.status) {
      setOrder(prev => ({ ...prev, status: newStatus }));
      toast.success(`Order status updated to ${newStatus}`);
    }
  };

  const handleNotesUpdate = () => {
    setOrder(prev => ({ ...prev, orderNotes: notes }));
    toast.success('Notes updated successfully');
  };

  const downloadArtwork = (fileName) => {
    // Mock download - replace with actual file download
    toast.info(`Downloading ${fileName}...`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning',
      processing: 'bg-info',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    return `badge ${badges[status] || 'bg-secondary'}`;
  };

  if (!order) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Order Details</h2>
              <p className="text-muted">Order ID: {order.id}</p>
            </div>
            <Link to="/admin/dashboard" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="row">
            {/* Left Column - Order Info */}
            <div className="col-md-8">
              {/* Customer Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Customer Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {order.customerName}</p>
                      <p><strong>Email:</strong> {order.customerEmail}</p>
                      <p><strong>Phone:</strong> {order.customerPhone}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Address:</strong></p>
                      <p className="text-muted">{order.customerAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Order Items</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Dimensions</th>
                          <th>Area</th>
                          <th>Qty</th>
                          <th>Price/sq.ft</th>
                          <th>Total</th>
                          <th>Artwork</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.productName}</td>
                            <td>{item.dimensions.length} × {item.dimensions.width} ft</td>
                            <td>{item.area} sq.ft</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.pricePerSqft}</td>
                            <td>₹{item.itemTotal.toLocaleString('en-IN')}</td>
                            <td>
                              {item.artworkFileName && (
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => downloadArtwork(item.artworkFileName)}
                                >
                                  📎 {item.artworkFileName}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="5" className="text-end"><strong>Subtotal:</strong></td>
                          <td><strong>₹{order.subtotal.toLocaleString('en-IN')}</strong></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-end"><strong>GST (18%):</strong></td>
                          <td><strong>₹{order.gst.toLocaleString('en-IN')}</strong></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-end"><strong>Total:</strong></td>
                          <td><strong className="text-primary">₹{order.total.toLocaleString('en-IN')}</strong></td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Artwork Files */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Artwork Files</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {order.artworkFiles.map((file, index) => (
                      <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body text-center">
                            <div className="mb-2">
                              <i className="bi bi-file-earmark" style={{fontSize: '2rem'}}></i>
                            </div>
                            <h6>{file.name}</h6>
                            <p className="text-muted small">
                              {file.size} • {file.uploadDate}
                            </p>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => downloadArtwork(file.name)}
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Status & Notes */}
            <div className="col-md-4">
              {/* Order Status */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Order Status</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <p><strong>Current Status:</strong></p>
                    <span className={`${getStatusBadge(order.status)} fs-6`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Update Status:</label>
                    <select 
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleStatusUpdate}
                    disabled={newStatus === order.status}
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* Order Info */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Order Information</h5>
                </div>
                <div className="card-body">
                  <p><strong>Order Date:</strong> {order.orderDate}</p>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total Amount:</strong> ₹{order.total.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Notes Section */}
              <div className="card">
                <div className="card-header">
                  <h5>Notes & Comments</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this order..."
                    />
                  </div>
                  <button 
                    className="btn btn-outline-primary w-100"
                    onClick={handleNotesUpdate}
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;