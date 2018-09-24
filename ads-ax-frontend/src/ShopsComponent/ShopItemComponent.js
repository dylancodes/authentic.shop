import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const ShopItemComponent = ({item}) => {
  return (
    <Grid fluid>
      <Row center="xs">
        <div className="shop-item">
          <h1>ITEM</h1>
        </div>
      </Row>
    </Grid>
  );
}

export default ShopItemComponent;
