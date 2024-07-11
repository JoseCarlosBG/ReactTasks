import { LOGIN_USER, LOGOUT_USER } from './types';
import { loginUser as loginUserService } from '../../services'; // Adjust the path as necessary

// Action creator for login
export const loginUserAction = (payload) => ({ type: LOGIN_USER, payload });

// Async action for login
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { token, user } = await loginUserService(email, password);
      const userData = {
        token,
        name: user.name,
        email,
      };

      // Save token to local storage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userName', user.name);

      dispatch(loginUserAction(userData));
    } catch (error) {
      console.error('Error during login:', error);
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
    dispatch(logoutUserAction());
  };
};
