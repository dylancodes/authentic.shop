import React, { Component } from 'react';

import OrdersScreenComponent from './OrdersScreenComponent.js';

class OrdersScreenIndex extends Component {
  constructor(props) {
    super(props);
    this.orders = [{
      date: 'Aug. 25th, 2018',
      orderId: '7326B',
      num_of_items: 3,
      deliveryType: 'Hotspot',
      totalAmount: 400.00,
      location: 'UnSq > 9/1/18 > 7:30pm',
      customer: 'Marcus Grove',
      email: 'marcusgrove007@gmail.com'
    },
    {
      date: 'Aug. 25th, 2018',
      orderId: '7326B',
      num_of_items: 3,
      deliveryType: 'Hotspot',
      totalAmount: 400.00,
      location: 'UnSq > 9/1/18 > 7:30pm',
      customer: 'Marcus Grove',
      email: 'marcusgrove007@gmail.com'
    },
    {
      date: 'Aug. 25th, 2018',
      orderId: '7326B',
      num_of_items: 3,
      deliveryType: 'Hotspot',
      totalAmount: 400.00,
      location: 'UnSq > 9/1/18 > 7:30pm',
      customer: 'Marcus Grove',
      email: 'marcusgrove007@gmail.com',
      brand: 'Wisdom Fashion House',
      productSku: '889CTWM'
    }]
  }

  componentDidMount() {
    // FETCH DATA
  }

  render() {
    return (
      <div className="adbc-body">
        <OrdersScreenComponent orders={this.orders} />
      </div>
    )
  }
}

export default OrdersScreenIndex;

// connect to redux state
