import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authenticateUserAction } from '../_actions/CurrentUserActions.js';
import { setFirstLoginAction } from '../_actions/LoginFormActions.js';
import { authFn, newPasswordFn, checkAuthFn } from '../utils/authUtility.js';

import NewPasswordForm from '../_components/NewPasswordForm.js';
import LoginScreenComponent from './LoginScreenComponent.js';
import ErrorBoundary from '../_components/ErrorBoundary.js';

import { AuthConsumer } from '../_contexts/authContext.js';

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

    // console.log(this.state.ctx);
    // if(this.state.ctx.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // } else {
    //   // sign in
    //   console.log("sign in");
    // }
    // try/catch
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

  onFormSubmission = async (username, password) => {
    try {
      const result = await authFn(username, password);
      this.setState({ errMsg: null });
      if(result.NEW_PASSWORD_REQUIRED) {
         this.props.setFirstLogin(true); // re-factor this into the authProvider/Consumer
      }
      else {
        // this is where I should update the authProvider/Consumer
        this.props.history.push('/dashboard');
      }
    }
    catch(errorMsg) {
      // log to service
      this.setState({errMsg: errorMsg});
      console.log("error logging in");
    }
  }

  updatePassword = async (newPassword) => {
    try {
      await newPasswordFn(newPassword);
      this.setState({ errMsg: null });
      // update authProvider/Consumer
      this.props.history.push('/dashboard')
    }
    catch(errorMsg) {
      // log to service
      this.setState({errMsg: errorMsg});
      console.log("error changing password");
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <React.Fragment>
        {this.props.form.isFirstLogin ? (
          <NewPasswordForm errMsg={this.state.errMsg} updatePassword={this.updatePassword} />
        ) : (
          <LoginScreenComponent errMsg={this.state.errMsg} onFormSubmission={this.onFormSubmission}/>
        )}
        </React.Fragment>
      </ErrorBoundary>
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
