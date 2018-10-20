import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticateUserAction } from '../_actions/CurrentUserActions.js';
import { setFirstLoginAction } from '../_actions/LoginFormActions.js';
import { authFn, newPasswordFn, checkAuthFn } from '../utils/authUtility.js';

import NewPasswordForm from '../_components/NewPasswordForm.js';
import LoginScreenComponent from './LoginScreenComponent.js';

import '../_styles/LoginScreen.css';

class LoginScreenIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: null
    }
    this.checkAuth();
    this.onFormSubmission = this.onFormSubmission.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  checkAuth() {
    // check against AWS session instead ??
    // const authStatus = this.props.user.isAuthenticated;
    const authStatus = checkAuthFn();
    console.log("Login screen");
    console.log(authStatus);
    if(authStatus) {
      console.log("sdfsdf");
      this.props.history.push("/dashboard");
    } else {
      console.log("sign in bitch");
    }
  }

  onFormSubmission = (username, password) => {
    authFn(username, password)
    .then((result) => {
      this.setState({ errMsg: null });
      if(result.NEW_PASSWORD_REQUIRED) {
        this.props.setFirstLogin(true);
        console.log("new password required");
      }
      else {
        this.props.authenticateUser(true, result.COGNITO_USER);
        this.props.history.push('/dashboard');
      }
    })
    .catch((errorMsg) => {
      this.setState({errMsg: errorMsg});
      console.log("error logging in");
    });
  }

  updatePassword = (newPassword) => {
    newPasswordFn(newPassword)
    .then((result) => {
      this.setState({ errMsg: null });
      this.props.authenticateUser(true, result.COGNITO_USER);
      this.props.history.push('/dashboard')
    })
    .catch((errorMsg) => {
      this.setState({errMsg: errorMsg});
      console.log("error changing password");
    });
  }

  render() {
    return (
      <React.Fragment>
      {this.props.form.isFirstLogin ? (
        <NewPasswordForm errMsg={this.state.errMsg} updatePassword={this.updatePassword} />
      ) : (
        <LoginScreenComponent errMsg={this.state.errMsg} onFormSubmission={this.onFormSubmission}/>
      )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: {
      isAuthenticated: state.currentUser.isAuthenticated
    },
    form: {
      isFirstLogin: state.loginForm.isFirstLogin,
    }
  };
}

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (authenticated, user) => {
    dispatch(authenticateUserAction(authenticated, user));
  },
  setFirstLogin: (isFirstLogin) => {
    dispatch(setFirstLoginAction(isFirstLogin));
  }
});

const LoginScreenContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreenIndex);

LoginScreenIndex.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  setFirstLogin: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default LoginScreenContainer;
