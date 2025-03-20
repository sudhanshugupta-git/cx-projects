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
//           <button className="" onClick={() => addToCart(product)}>Add to Cart</button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default ProductPage;


import { products } from '../assets/data';

const ProductPage = ({cart, handleCartToggle }) => {

  return (
    <div className="product">
      <h2 className="title">Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} className="" />
            <div className="details">
              <p className="name">{product.name}</p>
              <p>Rs {product.price}</p>
            </div>
            <button
              className={cart.some((item) => item.id === product.id) ? 'remove' : 'add'}
              onClick={() => handleCartToggle(product)}
            >
              {/* {cart.includes(product) ? 'Remove from Cart' : 'Add to Cart'} */}
              {cart.some((item) => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
