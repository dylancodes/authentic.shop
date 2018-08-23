import React, { Component } from 'react';

import OrdersScreenComponent from './OrdersScreenComponent.js';

class OrdersScreenIndex extends Component {
  constructor(props) {
    super(props);

  }

  // component lifecycle methods that make an axios GET request when component mounts


  render() {
    return (
      <div className="adbc-body">
        <OrdersScreenComponent />
      </div>
    )
  }
}

export default OrdersScreenIndex;

// connect to redux state
