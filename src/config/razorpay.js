export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx';

export const razorpayOptions = (amount, orderId, customerDetails, onSuccess, onFailure) => ({
  key: RAZORPAY_KEY_ID,
  amount: amount * 100, // Razorpay expects paise (₹1 = 100 paise)
  currency: 'INR',
  name: 'NEU Store Branding',
  description: 'Store Branding Products',
  order_id: orderId, // Optional - generate from backend later
  prefill: {
    name: customerDetails.name,
    email: customerDetails.email,
    contact: customerDetails.phone
  },
  theme: {
    color: '#0d6efd'
  },
  handler: onSuccess,
  modal: {
    ondismiss: onFailure
  }
});