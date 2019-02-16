import React from 'react';
import AWS from 'aws-sdk';
import AWSConfig from '../aws-config.js';

import { userFn } from '../utils/authUtility.js';

const AuthContext = React.createContext({ status: false });

class AuthProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: this.validateTokens(),
      isFirstLogin: false,
      toggleAuth: this.toggleAuth,
      toggleFirstLogin: this.toggleFirstLogin
    };
  }

  validateTokens = () => {
    const user = userFn();
    if(user) {
      return user.getSession((err, session) => {
        if(err) {
          console.log(err.message || JSON.stringify(err));
          return false;
        }
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_C0HNsNxHX': session.idToken.jwtToken
            }
          });
        return true;
      });
    } else {
      return false;
    }
  }

  toggleAuth = () => {
    // more layers of security ... check AWS credentials? refresh AWS credentials?
    this.setState(prevState => ({
      isAuthenticated: !prevState.isAuthenticated
    }));
  }

  toggleFirstLogin = () => {
    this.setState(prevState => ({
      isFirstLogin: !prevState.isAuthenticated
    }));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
