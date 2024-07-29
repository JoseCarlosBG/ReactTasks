import { LOGIN_USER, LOGOUT_USER } from "./types";

const initialState = {
  token: null,
  name: null,
  email: null,
  role: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
