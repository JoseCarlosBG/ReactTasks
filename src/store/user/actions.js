import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from "./types";

// Action creator for login
export const loginUserAction = (payload) => ({ type: LOGIN_USER, payload });

// Action creator for logout
export const logoutUserAction = () => ({ type: LOGOUT_USER });

// Action creator for fetching user data
export const fetchUserAction = (payload) => ({ type: FETCH_USER, payload });
