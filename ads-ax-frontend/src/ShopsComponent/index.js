import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import { checkAuthFn } from '../utils/auth.js';
import ShopPage from './ShopsComponent.js';

class ShopsContainer extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth() {
    // const authStatus = this.props.isAuthenticated;
    const authStatus = checkAuthFn();
    console.log("Shops Page");
    console.log(authStatus);
    if(authStatus) {
      // do nothing
    } else {
      this.props.history.push('/');
    }
  }

  getAllShops() {

  }

  render() {
    return (
      <div className="adbc-body">
        <ShopPage />
      </div>
    );
  }
}

export default ShopsContainer;
