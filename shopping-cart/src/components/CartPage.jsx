
const CartPage = ({ cart, updateCart, removeFromCart }) => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <div className="cart">
        <h2 className="">Your Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty</p> : (
          <div className="items">
            {cart.map((item, index) => (
              <div key={index} className="item">
                <img src={item.imageUrl} alt={item.name} className="" />
                <div>
                  <p>{item.name}</p>
                  <p>Rs {item.price}</p>
                </div>
                <div className="count">
                  <button className="" onClick={() => updateCart(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <p className="">{item.quantity}</p>
                  <button className="" onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                </div>
                  <button className="" onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            ))}
            <h3 className="">Grand Total: Rs {calculateTotal()}</h3>
          </div>
        )}
      </div>
    );
  };
  
  export default CartPage;