import { STORAGE_KEYS } from '../../constants';
import { LOGIN_USER, LOGOUT_USER } from './types';

const initialState = {
  name: '',
  email: '',
  token: localStorage.getItem(STORAGE_KEYS.USER_TOKEN) || '',
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
      localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      return {
        ...state,
        name: '',
        email: '',
        token: '',
      };
    default:
      return state;
  }
};

export default userReducer;
