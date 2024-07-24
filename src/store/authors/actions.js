// src/store/authors/actions.js
import { SAVE_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR } from './types';
import { API_ENDPOINTS, ENV } from '../../constants';
import { STORAGE_KEYS } from '../../constants';

const addAuthorAction = (payload) => ({ type: ADD_AUTHOR, payload });
const deleteAuthorAction = (payload) => ({ type: DELETE_AUTHOR, payload });
const saveAuthorsAction = (payload) => ({ type: SAVE_AUTHORS, payload });

export const fetchAuthors = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.AUTHORS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(saveAuthorsAction(data.result));
      } else {
        console.error('Failed to fetch authors:', response.status);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };
};

export const addAuthor = (name) => {
  return async (dispatch) => {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.AUTHORS}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(addAuthorAction(result.result)); // Dispatch action to add author to Redux store
        return result.result;
      } else {
        console.error('Failed to add author:', response.status);
      }
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };
};
