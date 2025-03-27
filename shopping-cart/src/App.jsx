import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import NotFound from './components/NotFound';
import './App.css';
import useCart from './api/cart';


const App = () => {
  // const [cart, setCart] = useState([]);

  // const addToCart = async (product) => {
  //   const existingItem = cart.find(item => item.id === product.id);
  //   if (existingItem) {
  //     updateCart(product.id, existingItem.quantity + 1);
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };

  // const handleCartToggle = async (product) => {
  //   const existingItem = cart.find(item => item.id === product.id);
  //   // if (cart.includes(product)) {  
  //   if (existingItem) {
  //     // Remove the product from the cart
  //     setCart(cart.filter((item) => item.id !== product.id));
  //   } else {
  //     // Add the product to the cart
  //     addToCart(product);
  //   }
  // };

  // const updateCart = async (id, quantity) => {
  //   setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  // };

  // const removeFromCart = (id) => {
  //   setCart(cart.filter(item => item.id !== id));
  // };

  const { cart, addToCart, handleCartToggle, updateCart, removeFromCart } = useCart();
  // console.log(cart);

  return (
    <div className="app">
      <Router >
        <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<ProductPage handleCartToggle={handleCartToggle} cart={cart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// handleCartToggle={handleCartToggle} cart={cart}