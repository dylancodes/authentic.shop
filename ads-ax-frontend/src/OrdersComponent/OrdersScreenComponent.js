import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../_styles/ADbC.css';

class OrdersScreenComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <React.Fragment>
        <div className="adbc--header__div">
          <Link to ="/dashboard">
            <h1>Admin.Authentic.Shop</h1>
          </Link>
        </div>
        <div className="adbc--main__div">
          
        </div>
      </React.Fragment>
    );
  }
}

export default OrdersScreenComponent;
