import AWS from 'aws-sdk';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

import AWSConfig from '../aws-config.js';

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
        AWS.config.update({ region: AWSConfig.cognito.REGION });
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

export const userFn = () => {
  return this.internals.userPool.getCurrentUser();
}

export const signOutFn = () => {
  const user = this.internals.userPool.getCurrentUser();
  user.signOut();
  this.internals.cognitoUser = null;
}

export const checkAuthFn = () => {
  const user = this.internals.userPool.getCurrentUser();
  if(user != null) {
    return user.getSession((err, session) => {
      if(err) {
        // log error
        return false;
      }
      // log session validity + session.isValid()
      return true;
    });
  }
  return false;
}

/*
<--- NOTES --->
Everytime you need temp credentials you need to update the AWS.config.credentials object
that means you need to get the current user, then getSession from that user, then
Add the User's Id Token to the Cognito credentials login map.
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'YOUR_IDENTITY_POOL_ID',
    Logins: {
        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result.getIdToken().getJwtToken()
    }
});

Make sure you check to see what the expiration details on the tokens are...
when the tokens expire, you should call
AWS.config.credentials.refresh((error) => {
  if (error) {
      console.error(error);
  } else {
      console.log('Successfully logged!');
  }
});

somehow, I think you should be using the temp credentials to access AWS resources,
use this for reference: https://github.com/jessecascio/jessesnet/blob/master/portfolio/reactjs-aws-cognito/src/view/Secure.js


Your resources should grant access to the appropriate federated identity pools,
you can also set up unathenticated access for guests...
this will probably be helpful for the cx-frontend-service
*/
