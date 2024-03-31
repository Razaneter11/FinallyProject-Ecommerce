// في ملف CartProvider.jsx

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.post('https://ecommerce-node4-five.vercel.app/cart',
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCount(prevCount => prevCount + 1);
      setCart(data.products);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, count, setCount,  }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
