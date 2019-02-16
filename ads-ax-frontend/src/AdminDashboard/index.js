import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { checkAuthFn } from '../utils/authUtility.js';

import ADbC from './AdminDashboardComponent.js';
import ErrorBoundary from '../_components/ErrorBoundary.js';

class AdminDashboardIndex extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth = () => {
    if(!this.props.authCtx.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  logoutUser = () => {
    this.props.authCtx.toggleAuth();
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="adbc-body">
          <ADbC history={this.props.history} logoutUser={this.logoutUser}/>
        </div>
      </ErrorBoundary>
    );
  }
}

AdminDashboardIndex.propTypes = {
  authCtx: PropTypes.object.isRequired
}

export default AdminDashboardIndex;
