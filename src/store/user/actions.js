import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from './types';
import { loginUser as loginUserService } from '../../services';
import { getUserData as getUserDataService } from '../../services';

// Action creator for login
export const loginUserAction = (payload) => ({ type: LOGIN_USER, payload });

// Async action for login
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { token } = await loginUserService(email, password);

      // Fetch user data including role
      const user = await getUserDataService(token);

      const userData = {
        token,
        name: user.result.name,
        email: user.result.email,
        role: user.result.role, 
      };

      // Save token and user data to local storage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userName', user.result.name);
      localStorage.setItem('userRole', user.result.role);

      dispatch(loginUserAction(userData));
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
};

// Action creator for logout
export const logoutUserAction = () => ({ type: LOGOUT_USER });

// Async action for logout
export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    dispatch(logoutUserAction());
  };
};

// Action creator for fetching user data
export const fetchUserAction = (payload) => ({ type: FETCH_USER, payload });

// Async action for fetching user data
export const fetchUserData = (token) => {
  return async (dispatch) => {
    try {
      const user = await getUserDataService(token);
      const userData = {
        token,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      dispatch(fetchUserAction(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
};