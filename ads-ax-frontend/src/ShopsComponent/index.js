import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import { checkAuthFn } from '../utils/auth.js';
import ShopPage from './ShopsComponent.js';
import AWS from 'aws-sdk';
import { getAllShops, createShop, editShop, deleteShop } from '../utils/api/shops.js';

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    // add items to redux state, check if items is null, fire request
    this.getAll = this.getAll.bind(this);
    this.addShop = this.addShop.bind(this);
    this.changeShop = this.changeShop.bind(this);
    this.removeShop = this.removeShop.bind(this);
    this.state = {
      items: null
    }
    this.getAll();
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

  getAll = () => {
    if(this.state.items === null) {
      getAllShops().then((result) => {
        this.setState({ items: result.data });
      })
      .catch((err) => {
        console.log(err);
        // handle err
      });
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

  changeShop = (shopAccount, params) => {
    return new Promise((resolve, reject) => {
      editShop(shopAccount, params)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
        // handle err
      })
    });
  }

  removeShop = (shopAccount) => {
    return new Promise((resolve, reject) => {
      deleteShop(shopAccount)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  render() {
    return (
      <div className="adbc-body">
        {this.state.items ? <ShopPage items={this.state.items} createShop={this.addShop} changeShop={this.changeShop} removeShop={this.removeShop} /> : <div><h1>Loading...</h1></div>}
      </div>
    );
  }
}

export default ShopsContainer;
