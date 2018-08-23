import { combineReducers } from 'redux';

import currentUserReducer from './CurrentUserReducer.js';
import loginFormReducer from './LoginFormReducer.js';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  loginForm: loginFormReducer
});

export default rootReducer;
