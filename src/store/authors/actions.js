// authors/actions.js
import { SAVE_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR } from './types';
import { API_ENDPOINTS, ENV } from '../../constants'; // Adjust the import path as necessary

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
