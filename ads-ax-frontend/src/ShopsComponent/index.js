import React, { Component } from 'react';
import AWS from 'aws-sdk';

import { checkAuthFn } from '../utils/authUtility.js';
import { getAllShops, createShop, editShop, deleteShop } from '../utils/api/shopsUtility.js';

import ShopPage from './ShopsComponent.js';
import ErrorBoundary from '../_components/ErrorBoundary.js';

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    }
    this.checkAuth();
    this.getAll(); // add items to redux state, check if items is null, fire request
  }

  checkAuth = () => {
    // try/catch
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
    const data = {
      shopAccount: params.shopAccount,
      displayName: params.displayName,
      hq: params.hq,
      description: params.description,
      contact: {
        email: params.contact.email,
        name: params.contact.name,
        phone: params.contact.phone,
        title: params.contact.title
      },
      attachments: params.attachments
    };
    createShop(data)
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
      const data = {
        item: params.item,
        value: params.value
      };
      editShop(shopAccount, data)
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
        this.setState(prevState => ({
          items: prevState.items.filter(shop => {
            return shop.shopAccount !== shopAccount
          })
        }));
        resolve(this.state.items);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="adbc-body">
          {this.state.items ? <ShopPage items={this.state.items} addShop={this.addShop} changeShop={this.changeShop} removeShop={this.removeShop} /> : <div><h1>Loading...</h1></div>}
        </div>
      </ErrorBoundary>
    );
  }
}

export default ShopsContainer;
