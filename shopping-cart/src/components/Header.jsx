import { Link, useLocation } from 'react-router-dom';

const Header = ({ cartCount }) => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <header className="header">
      <h1 style={{ margin: 0 }}>Shopping Cart</h1>
      {isCartPage ? <Link to="/">Go to Products</Link> : <Link to="/cart">Cart🛒 ({cartCount})</Link>}
    </header>
  );
};

export default Header;