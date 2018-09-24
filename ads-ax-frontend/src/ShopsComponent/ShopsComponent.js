import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../_components/Header.js';
import ShopItem from './ShopItemComponent.js';

import '../_styles/shops.css';

class ShopsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <ShopItem />
      </React.Fragment>
    );
  }
}

export default ShopsComponent;
