// src/context/CartContext.js

import { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart or increase quantity if it already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, price: product.price || 0, quantity: 1 }]
      }
    })
  };

  // Remove product from cart or decrease quantity if more than 1
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  };

  const calculateTotal = () =>
    cart.reduce((total, product) => total + product.price * product.quantity, 0)

  const clearCart = () => {
    setCart([])
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
