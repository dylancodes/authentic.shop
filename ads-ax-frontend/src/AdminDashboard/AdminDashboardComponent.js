import React, { Component } from 'react';
import AWS from 'aws-sdk';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signOutFn } from '../utils/authUtility.js';

import '../_styles/ADbC.css';

class AdminDashboardComponent extends Component {
  exitUser = async () => {
    try {
      await signOutFn();
      this.props.logoutUser();
      this.props.history.push('/');
    }
    catch(err) {
      // log to service
      console.log(err);
      console.log('err logging out error');
      throw new Error(err);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="adbc--header__div">
          <h1>Admin.Authentic.Shop</h1>
        </div>
        <div className="adbc--main__div">
          <div style={{textAlign:'left'}}>
            <Link to="/dashboard/orders" className="main-link">Orders</Link>
            <Link to="/dashboard" className="main-link">Products</Link>
            <Link to="/dashboard" className="main-link">Hotspots</Link>
            <Link to="/dashboard/shops" className="main-link">Shops</Link>
            <h1 className="signout-btn" onClick={this.exitUser}>Sign Out</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AdminDashboardComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

export default AdminDashboardComponent;
