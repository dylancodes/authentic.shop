import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import { checkAuthFn } from '../utils/auth.js';
import ShopPage from './ShopsComponent.js';
import AWS from 'aws-sdk';
import { getAllShops, createShop, editShop, deleteShop } from '../utils/api/shopsUtility.js';

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    this.state = {
      items: null
    }
    // add items to redux state, check if items is null, fire request
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
      <div className="adbc-body">
        {this.state.items ? <ShopPage items={this.state.items} addShop={this.addShop} changeShop={this.changeShop} removeShop={this.removeShop} /> : <div><h1>Loading...</h1></div>}
      </div>
    );
  }
}

export default ShopsContainer;


// TODO
// (X) Remove deleted item from state
// () implement Universal Error Page
// () Connect components to Redux state for Universal Error Page, definitely with status of isError and maybe with the error message so that we can show that on the universal error page
// () Implement this.state.items into Redux state
// () Implement proper error handling -> should display universal error page with support
// () Comment out the application
// () Reset/Remove add shop form after submission
