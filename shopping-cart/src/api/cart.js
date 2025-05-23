import axios from "axios";
import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const addToCart = async (product) => {
    try {
      // console.log(product);
      product = {...product, productId:product.id};
      // console.log(product.data);
      const response = await axios.post(apiUrl, product);
      console.log(response);
      setCart(response.data.data); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleCartToggle = async (product) => {
    // console.log(product);
    // const existingItem = cart.find((item) => item.id === product.id);
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      try {
        const response = await axios.delete(apiUrl+product.id);
        // console.log(response);
        setCart(response.data.data); 
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      addToCart(product); 
    }
  };

  const updateCart = async (id, quantity) => {
    try {
      // console.log(quantity);
      const response = await axios.patch(apiUrl+id, {quantity} );
      // console.log(response);
      setCart(response.data.data); 
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(apiUrl+id);
      // console.log(response);
      setCart(response.data.data); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return { cart, addToCart, handleCartToggle, updateCart, removeFromCart };
};

export default useCart;