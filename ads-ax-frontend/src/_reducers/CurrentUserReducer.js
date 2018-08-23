const initialState = {
  isAuthenticated: false,
  username: '',
  emailAddress: ''
}

const currentUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        username: action.payload.username,
        emailAddress: action.payload.emailAddress
      };
    case 'SET_USER_DETAILS':
      return {
        ...state,
        username: action.payload.username,
        emailAddress: action.payload.emailAddress
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated
      };
    default:
      return state;
  }
}

export default currentUserReducer;
