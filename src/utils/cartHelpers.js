/**
 * Cart Helper Functions
 * Utility functions for cart operations and calculations
 */

export const calculateItemTotal = (item) => {
  return item.price * item.quantity;
};

export const calculateCartSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
};

export const calculateGST = (subtotal, rate = 0.18) => {
  return Math.round(subtotal * rate);
};

export const calculateCartTotal = (cartItems) => {
  const subtotal = calculateCartSubtotal(cartItems);
  const gst = calculateGST(subtotal);
  return subtotal + gst;
};

export const formatPrice = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const validateCartItem = (item) => {
  return item && item.id && item.name && item.price && item.quantity > 0;
};

export const getUniqueCartId = (product, options = {}) => {
  // Generate unique ID based on product and customization options
  const optionsString = JSON.stringify(options);
  return `${product.id}_${btoa(optionsString)}`;
};