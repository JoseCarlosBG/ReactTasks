import { API_ENDPOINTS, STORAGE_KEYS, ENV } from '../../constants';
import { LOGIN_USER, LOGOUT_USER } from './types';

export const loginUserSuccess = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${ENV}${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const token = data.result;
    const user = data.user;
    
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);

    dispatch(loginUserSuccess({
      name: user.name,
      email: user.email,
      token,
    }));

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
