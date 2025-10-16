import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: [],
    itemCount: 0,
    subtotal: 0,
    gst: 0,
    total: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('brandingCartData');
    if (savedCart) {
      setCartState(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('brandingCartData', JSON.stringify(cartState));
  }, [cartState]);

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    const itemCount = items.length;
    
    return { subtotal, gst, total, itemCount };
  };

  const addToCart = (product, dimensions, quantity = 1, artworkFile = null) => {
    const area = dimensions.length * dimensions.width;
    const itemTotal = area * product.pricePerSqft * quantity;
    const uniqueId = `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newItem = {
      id: uniqueId,
      productId: product.id,
      productName: product.name,
      pricePerSqft: product.pricePerSqft,
      dimensions,
      area,
      quantity,
      itemTotal,
      artworkFile,
      artworkFileName: artworkFile ? artworkFile.name : null
    };

    setCartState(prevState => {
      const newItems = [...prevState.items, newItem];
      const totals = calculateTotals(newItems);
      
      toast.success(`${product.name} added to cart!`);
      
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCartState(prevState => {
      const newItems = prevState.items.filter(item => item.id !== itemId);
      const totals = calculateTotals(newItems);
      
      toast.info('Item removed from cart');
      
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartState(prevState => {
      const newItems = prevState.items.map(item => {
        if (item.id === itemId) {
          const newItemTotal = item.area * item.pricePerSqft * newQuantity;
          return { ...item, quantity: newQuantity, itemTotal: newItemTotal };
        }
        return item;
      });
      
      const totals = calculateTotals(newItems);
      
      return {
        items: newItems,
        ...totals
      };
    });
  };

  const clearCart = () => {
    setCartState({
      items: [],
      itemCount: 0,
      subtotal: 0,
      gst: 0,
      total: 0
    });
    
    localStorage.removeItem('brandingCartData');
    toast.info('Cart cleared');
  };

  const getCartItemCount = () => cartState.itemCount;

  const value = {
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };