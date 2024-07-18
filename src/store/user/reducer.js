import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from './types';

const initialState = {
  isAuth: false, 
  name: '',
  email: '',
  token: '',
  role: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case FETCH_USER:
      return {
        ...state,
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        role: action.payload.role,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};


export default userReducer;
