// import { products } from '../assets/data';

// const ProductPage = ({ addToCart }) => (
//   <div className="product">
//     <h2 className="title">Products</h2>
//     <div className="grid">
//       {products.map(product => (
//         <div key={product.id} className="card">
//           <img src={product.image} alt={product.name} className="" />
//           <div className="details">
//             <p className="name">{product.name}</p>
//             <p>Rs {product.price}</p>
//           </div>
//           <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default ProductPage;


import { products } from '../assets/data';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { fetchProducts } from '../api/product.js';

const ProductPage = ({cart, handleCartToggle }) => {
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     // const response = await axios.get("https://fakestoreapi.in/api/products");
  //     const response = await axios.get("http://localhost:5000/api/products/");
  //     console.log(response.data.products);
  //     setProducts(response.data.products);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // useEffect(()=>{
  //   fetchProducts();
  // },[])

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(); 
      // console.log(data);
      setProducts(data); 
    };
    getProducts();
  }, []);

  

  return (
    <div className="product">
      <h2 className="title">Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.imageUrl} alt={product.name} className="" />
            <div className="details">
              <p className="name">{product.name}</p>
              <p>Rs {product.price}</p>
            </div>
            <button
              // className={cart.includes(product) ? 'remove' : 'add'}   // includes compares reference, here the products and cart are two different arrays so comparision will return  false.
              className={cart.some((item) => item.productId === product.id) ? 'remove' : 'add'}
              onClick={() => handleCartToggle(product)}
            >
              {/* {cart.includes(product) ? 'Remove from Cart' : 'Add to Cart'} */}
              {cart.some((item) => item.productId === product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
