import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0
  });

  // Mock data - replace with Firestore
  useEffect(() => {
    const mockOrders = [
      {
        id: 'NEU-2025-001',
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh@example.com',
        products: 'Wall Graphics, Door Branding',
        amount: 25000,
        status: 'pending',
        date: '2025-01-15',
        items: [
          { name: 'Wall Graphics', dimensions: '10x8 ft', area: 80, quantity: 1 },
          { name: 'Door Branding', dimensions: '6x8 ft', area: 48, quantity: 2 }
        ],
        artworkFiles: ['design1.pdf', 'logo.ai']
      },
      {
        id: 'NEU-2025-002',
        customerName: 'Priya Sharma',
        customerEmail: 'priya@example.com',
        products: 'Header Board',
        amount: 15000,
        status: 'processing',
        date: '2025-01-14',
        items: [
          { name: 'Header Board', dimensions: '12x3 ft', area: 36, quantity: 1 }
        ],
        artworkFiles: ['header_design.png']
      },
      {
        id: 'NEU-2025-003',
        customerName: 'Amit Patel',
        customerEmail: 'amit@example.com',
        products: 'Floor Graphics',
        amount: 18000,
        status: 'completed',
        date: '2025-01-13',
        items: [
          { name: 'Floor Graphics', dimensions: '8x6 ft', area: 48, quantity: 1 }
        ],
        artworkFiles: ['floor_design.pdf']
      }
    ];

    setOrders(mockOrders);
    
    // Calculate stats
    const totalOrders = mockOrders.length;
    const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
    const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
    const revenue = mockOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
    
    setStats({ totalOrders, pendingOrders, completedOrders, revenue });
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
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

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5>Pending Orders</h5>
              <h2>{stats.pendingOrders}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Completed Orders</h5>
              <h2>{stats.completedOrders}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5>Revenue</h5>
              <h2>₹{stats.revenue.toLocaleString('en-IN')}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card">
        <div className="card-header">
          <h5>Recent Orders</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>
                      <div>
                        <div>{order.customerName}</div>
                        <small className="text-muted">{order.customerEmail}</small>
                      </div>
                    </td>
                    <td>{order.products}</td>
                    <td>₹{order.amount.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Link 
                          to={`/admin/orders/${order.id}`} 
                          className="btn btn-outline-primary"
                        >
                          View
                        </Link>
                        <div className="dropdown">
                          <button 
                            className="btn btn-outline-secondary dropdown-toggle" 
                            data-bs-toggle="dropdown"
                          >
                            Status
                          </button>
                          <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => updateOrderStatus(order.id, 'pending')}>Pending</button></li>
                            <li><button className="dropdown-item" onClick={() => updateOrderStatus(order.id, 'processing')}>Processing</button></li>
                            <li><button className="dropdown-item" onClick={() => updateOrderStatus(order.id, 'completed')}>Completed</button></li>
                            <li><button className="dropdown-item" onClick={() => updateOrderStatus(order.id, 'cancelled')}>Cancelled</button></li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const renderOrders = () => (
    <div className="card">
      <div className="card-header">
        <h5>All Orders</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>
                    <div>
                      <div>{order.customerName}</div>
                      <small className="text-muted">{order.customerEmail}</small>
                    </div>
                  </td>
                  <td>{order.products}</td>
                  <td>₹{order.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={getStatusBadge(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link 
                        to={`/admin/orders/${order.id}`} 
                        className="btn btn-outline-primary"
                      >
                        View Details
                      </Link>
                      <button className="btn btn-outline-success">
                        Download Artwork
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <div className="card">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  📊 Dashboard
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  📦 Orders
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  🛍️ Products
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'customers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('customers')}
                >
                  👥 Customers
                </button>
                <button 
                  className={`list-group-item list-group-item-action ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Admin Dashboard</h2>
            <div className="text-muted">
              Welcome back, Admin
            </div>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'products' && (
            <div className="alert alert-info">
              <h4>Products Management</h4>
              <p>Product management features coming soon...</p>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="alert alert-info">
              <h4>Customer Management</h4>
              <p>Customer management features coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="alert alert-info">
              <h4>Settings</h4>
              <p>Settings panel coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;