const initialState = {
  isFirstLogin: false,
}

export const setLoginForm = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FIRST_LOGIN':
      return {
        ...state,
        isFirstLogin: action.payload.isFirstLogin
      };
    default:
      return state;
  }
}

export default setLoginForm;
