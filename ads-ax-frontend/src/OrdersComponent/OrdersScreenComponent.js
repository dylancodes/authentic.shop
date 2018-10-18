import React, { Component } from 'react';

import Header from '../_components/Header.js';
import OrderItem from './OrderItemComponent.js';

import '../_styles/ADbC.css';

class OrdersScreenComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="order-item--container">
          {this.props.orders.map((order, i) => {
            return (
              <React.Fragment>
              <div className="order-item--id" key={i}>
                <h5 style={{color:'white'}}>ORDER #: {order.orderId}</h5>
                <h5 style={{color:'white', textTransform:'uppercase'}}>DATE: {order.date}</h5>
                <h5 style={{color:'white'}}>DELIVERY: {order.deliveryType}</h5>
                <h5 style={{color:'white'}}>LOCATION: {order.location}</h5>
                <h5 style={{color:'green'}}>TOTAL: ${order.totalAmount}</h5>
              </div>
              <div key={i} className="order-item--div">
                <h4 style={{color:'white',paddingLeft:'20px',marginTop:'5px',marginBottom:'0px'}}>Items:</h4>
                {this.props.orders.map((order, i) => {
                  return <OrderItem key={i} orderAttr={order} />
                })}
              </div>
              </React.Fragment>
            )
          })}


        </div>
      </React.Fragment>
    );
  }
}

export default OrdersScreenComponent;
