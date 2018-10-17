import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../_components/Header.js';
import ShopItem from './ShopItemComponent.js';
import AddShop from '../_components/AddShopForm.js';

import '../_styles/shops.css';

class ShopsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
    this.showForm = this.showForm.bind(this);
  }

  showForm = () => {
    this.setState({ showForm: true });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <a href="#" onClick={this.showForm} styles={{backgroundColor: 'grey', padding: '7px 10px', color: 'white'}}>ADD SHOP</a>
        {this.state.showForm ? <AddShop addShop={this.props.addShop}/> : <React.Fragment />}
        {this.props.items.map((shopItem, i) => {
          return (<ShopItem key={i} item={shopItem} changeShop={this.props.changeShop} removeShop={this.props.removeShop} />);
        })}
      </React.Fragment>
    );
  }
}

export default ShopsComponent;
