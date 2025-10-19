import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { generateOrderId, createFirebaseOrderData, saveOrderToFirestore } from '../utils/orderHelpers';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('brandingCart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setItems(cartData);
        calculateTotals(cartData);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Calculate totals whenever items change
  const calculateTotals = (cartItems) => {
    const count = cartItems.length;
    const sub = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
    const gstAmount = sub * 0.18;
    const totalAmount = sub + gstAmount;

    setItemCount(count);
    setSubtotal(sub);
    setGst(gstAmount);
    setTotal(totalAmount);
  };

  // Add item to cart
  const addToCart = (product, dimensions, quantity, artworkFile) => {
    try {
      const area = dimensions.length * dimensions.width;
      const itemTotal = area * product.pricePerSqft * quantity;

      const newItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        pricePerSqft: product.pricePerSqft,
        dimensions: { length: dimensions.length, width: dimensions.width },
        area: area,
        quantity: quantity,
        itemTotal: itemTotal,
        artworkFile: artworkFile,
        artworkFileName: artworkFile ? artworkFile.name : null
      };

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      calculateTotals(updatedItems);
      localStorage.setItem('brandingCart', JSON.stringify(updatedItems));

      toast.success('Added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    calculateTotals(updatedItems);
    localStorage.setItem('brandingCart', JSON.stringify(updatedItems));
    toast.success('Item removed from cart');
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        const itemTotal = item.area * item.pricePerSqft * newQuantity;
        return { ...item, quantity: newQuantity, itemTotal };
      }
      return item;
    });

    setItems(updatedItems);
    calculateTotals(updatedItems);
    localStorage.setItem('brandingCart', JSON.stringify(updatedItems));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    calculateTotals([]);
    localStorage.removeItem('brandingCart');
    toast.success('Cart cleared');
  };

  // Place order
  const placeOrder = async (customerDetails, paymentMethod = 'pending', currentUser) => {
    try {
      if (!currentUser) {
        throw new Error('User must be logged in to place order');
      }

      const orderId = generateOrderId();
      const billing = { subtotal, gst, total };
      
      const orderData = createFirebaseOrderData(
        orderId,
        currentUser.uid,
        customerDetails,
        items,
        billing,
        paymentMethod
      );

      await saveOrderToFirestore(orderData);
      clearCart();
      
      toast.success('Order placed successfully!');
      return orderId;
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
      throw error;
    }
  };

  const value = {
    items,
    itemCount,
    subtotal,
    gst,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};