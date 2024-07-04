// src/store/user/reducer.js
import { LOGIN_USER, LOGOUT_USER } from './types';

const initialState = {
  name: '',
  email: '',
  token: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
