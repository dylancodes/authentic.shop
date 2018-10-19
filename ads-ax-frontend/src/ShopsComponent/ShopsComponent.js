import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Header from '../_components/Header.js';
import ShopItem from './ShopItemComponent.js';
import AddShop from '../_components/AddShopForm.js';
import Button from '../_components/Button.js';

import '../_styles/shops.css';

class ShopsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  showForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }));
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Button onClick={this.showForm} text={'ADD SHOP'} bgColor={'#103C57'} color={'white'} padding={'12px 7px'} />
        {this.state.showForm ? <AddShop addShop={this.props.addShop} showForm={this.showForm} /> : <React.Fragment />}
        {this.props.items.map((shopItem) => {
          return (<ShopItem key={shopItem.shopAccount} item={shopItem} changeShop={this.props.changeShop} removeShop={this.props.removeShop} />);
        })}
      </React.Fragment>
    );
  }
}

export default ShopsComponent;
