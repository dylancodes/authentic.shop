import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="adbc--header__div">
      <Link to ="/dashboard">
        <h1>Admin.Authentic.Shop</h1>
      </Link>
    </div>
  );
}

export default Header;
