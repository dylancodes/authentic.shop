import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUserAction, logoutUserAction } from '../_actions/CurrentUserActions.js';
import { checkAuthFn } from '../utils/auth.js';
import ADbC from './AdminDashboardComponent.js';

class AdminDashboardIndex extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth() {
    // const authStatus = this.props.isAuthenticated;
    // we can set it up to check against session status and auth status ... session status would be aws credentials and auth status would be redux state???
    const authStatus = checkAuthFn();
    console.log("Admin Dashboard");
    console.log(authStatus);
    if(authStatus) {
      // do nothing
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="adbc-body">
        <ADbC history={this.props.history} logoutUser={this.props.logoutUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.currentUser.isAuthenticated
  };
}

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (authenticated, user) => {
    dispatch(authenticateUserAction(authenticated, user));
  },
  logoutUser: (status) => {
    dispatch(logoutUserAction(status));
  }
});

const AdminDashboard = connect(mapStateToProps, mapDispatchToProps)(AdminDashboardIndex);

export default AdminDashboard;
