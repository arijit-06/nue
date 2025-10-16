/**
 * Order Helper Functions
 * Utility functions for order management and processing
 */

import { db } from '../config/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `NEU-${new Date().getFullYear()}-${timestamp}-${random}`;
};

export const calculateDeliveryDate = (orderDate, businessDays = 7) => {
  const date = new Date(orderDate);
  let addedDays = 0;
  
  while (addedDays < businessDays) {
    date.setDate(date.getDate() + 1);
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return date;
};

export const formatOrderDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

export const getOrderStatus = (orderDate) => {
  const now = new Date();
  const order = new Date(orderDate);
  const daysDiff = Math.floor((now - order) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) return 'Order Placed';
  if (daysDiff <= 2) return 'Processing';
  if (daysDiff <= 5) return 'In Production';
  if (daysDiff <= 7) return 'Ready for Dispatch';
  return 'Delivered';
};

export const validateOrderData = (orderData) => {
  const required = ['email', 'firstName', 'lastName', 'address', 'city', 'pincode'];
  return required.every(field => orderData[field] && orderData[field].trim() !== '');
};

export const createOrderSummary = (cartItems, customerInfo) => {
  return {
    orderId: generateOrderId(),
    orderDate: new Date().toISOString(),
    customer: customerInfo,
    items: cartItems,
    subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    gst: Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.18),
    total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.18,
    status: 'Order Placed',
    estimatedDelivery: calculateDeliveryDate(new Date())
  };
};

export const createFirebaseOrderData = (orderId, userId, customerDetails, items, billing, paymentMethod = 'pending') => {
  return {
    orderId,
    userId,
    customerDetails: {
      name: `${customerDetails.firstName} ${customerDetails.lastName}`,
      email: customerDetails.email,
      phone: customerDetails.phone || '',
      address: customerDetails.address,
      city: customerDetails.city,
      pincode: customerDetails.pincode
    },
    items: items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      dimensions: item.dimensions,
      area: item.area,
      pricePerSqft: item.pricePerSqft,
      quantity: item.quantity,
      itemTotal: item.itemTotal,
      artworkFileName: item.artworkFileName,
      artworkFilePath: item.artworkFile ? `/jobs/${orderId}/${item.artworkFileName}` : null
    })),
    billing,
    payment: {
      method: paymentMethod,
      status: 'pending'
    },
    orderStatus: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
};

export const saveOrderToFirestore = async (orderData) => {
  try {
    await addDoc(collection(db, 'orders'), orderData);
    await addDoc(collection(db, 'users', orderData.userId, 'orders'), orderData);
    return orderData.orderId;
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      orderStatus: newStatus,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};