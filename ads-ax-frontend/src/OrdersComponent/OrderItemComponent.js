import React from 'react';

const OrderItemComponent = (props) => {
  console.log(props);
  return (
    <div>
      <div className="order-item--left">
        <h6>SHOP: <br/> Wisdom Fashion House</h6>
      </div>
      <div className="order-item--right">
        <h6>MARCUS GROVE</h6>
        <h6>marcusgrove007@gmail.com</h6>
        <h6>SKU: 889CTWM</h6>
      </div>
    </div>
  );
}

export default OrderItemComponent;
