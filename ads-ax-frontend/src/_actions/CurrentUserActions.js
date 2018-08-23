import { AUTHENTICATE_USER, SET_USER_DETAILS, LOGOUT_USER } from './ActionTypes.js';

export const authenticateUserAction = (authenticated, user) => {
  return {
    type: AUTHENTICATE_USER,
    payload: {
      isAuthenticated: authenticated,
      username: user.idToken.payload.name,
      emailAddress: user.idToken.payload.email
    }
  }
};

export const setUserDetailsAction = (user) => {
  return {
    type: SET_USER_DETAILS,
    payload: {
      username: user.username,
      emailAddress: user.emailAddress
    }
  }
}

export const logoutUserAction = (status) => {
  return {
    type: LOGOUT_USER,
    payload: {
      isAuthenticated: status
    }
  }
}
