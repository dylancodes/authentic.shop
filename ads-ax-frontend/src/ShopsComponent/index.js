import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import { checkAuthFn } from '../utils/auth.js';
import ShopPage from './ShopsComponent.js';
import AWS from 'aws-sdk';
import { getAllShops, createShop } from '../utils/api/shops.js';

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    this.addShop = this.addShop.bind(this);
    this.state = {
      items: null
    }
    // add items to redux state, check if items is null, fire request
    getAllShops().then((result) => {
      this.setState({ items: result.data });
    })
    .catch((err) => {
      console.log(err);
      // handle err
    });
  }

  checkAuth() {
    // const authStatus = this.props.isAuthenticated;
    const authStatus = checkAuthFn();
    console.log("Shops Page");
    console.log(authStatus);
    if(authStatus && AWS.config.credentials != null) {
      // do nothing
    } else {
      this.props.history.push('/');
    }
  }

  addShop = (params) => {
    createShop(params)
    .then((result) => {
      this.setState(previousState => ({
        items: [...previousState.items, result.data]
      }));
    })
    .catch((err) => {
      console.log(err);
      // handle err
    })
  }

  render() {
    return (
      <div className="adbc-body">
        {this.state.items ? <ShopPage items={this.state.items} createShop={this.addShop}/> : <div><h1>Loading...</h1></div>}
      </div>
    );
  }
}

export default ShopsContainer;
