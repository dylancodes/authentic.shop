import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { authFn, newPasswordFn } from '../utils/authUtility.js';

import NewPasswordForm from '../_components/NewPasswordForm.js';
import LoginScreenComponent from './LoginScreenComponent.js';
import ErrorBoundary from '../_components/ErrorBoundary.js';

import '../_styles/LoginScreen.css';

class LoginScreenIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: null
    }
    this.onFormSubmission = this.onFormSubmission.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  checkAuth() {
    if(this.props.authCtx.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onFormSubmission = async (username, password) => {
    try {
      const result = await authFn(username, password);
      this.setState({ errMsg: null });
      if(result.NEW_PASSWORD_REQUIRED) {
         this.props.authCtx.toggleFirstLogin();
      }
      else {
        this.props.authCtx.toggleAuth();
        this.props.history.push('/dashboard');
      }
    }
    catch(errorMsg) {
      // log to service
      console.log(errorMsg);
      if(typeof errorMsg === 'string') {
        this.setState({ errMsg: errorMsg });
      } else {
        this.setState({errMsg: "Error logging in. Please contact support@authentic.shop for assistance."});
      }
    }
  }

  updatePassword = async (newPassword) => {
    try {
      await newPasswordFn(newPassword);
      this.setState({ errMsg: null });
      this.props.authCtx.toggleAuth();
      this.props.history.push('/dashboard');
    }
    catch(errorMsg) {
      // log to service
      console.log(errorMsg);
      this.setState({errMsg: "Error updating password. Please contact support@authentic.shop for assistance."});
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <React.Fragment>
        {this.props.authCtx.isFirstLogin ? (
          <NewPasswordForm errMsg={this.state.errMsg} updatePassword={this.updatePassword} />
        ) : (
          <LoginScreenComponent errMsg={this.state.errMsg} onFormSubmission={this.onFormSubmission}/>
        )}
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

LoginScreenIndex.propTypes = {
  authCtx: PropTypes.object.isRequired
}

export default LoginScreenIndex;
