import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body p-5">
              <h1 className="mb-4">Shipping & Delivery Policy</h1>
              <p className="text-muted mb-4">Last updated on Oct 17 2025</p>
              
              <div className="policy-content">
                <p className="mb-4">
                  For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
                </p>
                
                <p className="mb-4">
                  Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                </p>
                
                <p className="mb-4">
                  ARIJIT DAS is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                </p>
                
                <p className="mb-4">
                  Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                </p>
                
                <div className="alert alert-info">
                  <h5 className="alert-heading">Contact Information</h5>
                  <p className="mb-0">
                    For any issues in utilizing our services you may contact our helpdesk on <strong>8013272742</strong> or <strong>arijit270906@gmail.com</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;