// src/store/user/actions.js
import { LOGIN_USER, LOGOUT_USER } from './types';
import { ENV, API_ENDPOINTS } from '../../constants';

// Action creator for login
export const loginUserAction = (payload) => ({ type: LOGIN_USER, payload });

// Async action for login
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.successful && result.result) {
          const token = result.result.replace('Bearer ', '');
          const user = {
            token,
            name: result.user.name,
            email,
          };

          localStorage.setItem('userToken', token);
          localStorage.setItem('userName', result.user.name);
          dispatch(loginUserAction(user));
        } else {
          console.error('Login failed:', result);
        }
      } else {
        console.error('Login failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
};
