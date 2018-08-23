import { SET_FIRST_LOGIN } from './ActionTypes.js';

export const setFirstLoginAction = (isFirstLogin) => {
  return {
    type: SET_FIRST_LOGIN,
    payload: {
      isFirstLogin
    }
  }
}
