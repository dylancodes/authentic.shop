import AWSConfig from '../aws-config.js';
import AWS from 'aws-sdk';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

this.internals = {};

this.internals.poolData = {
  UserPoolId : AWSConfig.cognito.USER_POOL_ID,
  ClientId : AWSConfig.cognito.APP_CLIENT_ID
}

this.internals.userPool = new CognitoUserPool(this.internals.poolData);

export const authFn = (username, password) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: this.internals.userPool
    }

    const tempUser = new CognitoUser(userData);

    const authenticationData = {
        Username : username,
        Password : password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    tempUser.authenticateUser(authenticationDetails, {
      onSuccess: (user) => {
        this.internals.cognitoUser = user;
        // Configure the credentials provider to use your identity pool
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_C0HNsNxHX': user.idToken.jwtToken
            }
        });
        const returnObj = {
          NEW_PASSWORD_REQUIRED: null,
          COGNITO_USER: user
        }
        resolve(returnObj);
      },
      onFailure: (err) => {
        const errorMsg = err.message + ' Please try again to continue.';
        reject(errorMsg);
     },
      newPasswordRequired: (userAttributes) => {
         delete userAttributes.email_verified;
         delete userAttributes.phone_number_verified;
         userAttributes.name = authenticationDetails.username;
         this.internals.userAttr = userAttributes;
         this.internals.cognitoUser = tempUser;
         const returnObj = {
           NEW_PASSWORD_REQUIRED: true,
           COGNITO_USER: null
         }
         resolve(returnObj);
      }
    });
  });
}

export const newPasswordFn = (newPassword) => {
  return new Promise((resolve, reject) => {
    const userAttr = this.internals.userAttr;
    this.internals.cognitoUser.completeNewPasswordChallenge(newPassword, userAttr, {
      onSuccess: (user) => {
        const returnObj = {
          COGNITO_USER: user
        }
        resolve(returnObj);
      },
      onFailure: (err) => {
        const errorMsg = err.message + ' Please try again to continue.';
        reject(errorMsg);
      }
    });
  });
}
