import { SAVE_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR } from "./types";

// Synchronous action creators
export const saveAuthorsAction = (payload) => ({ type: SAVE_AUTHORS, payload });
export const addAuthorAction = (payload) => ({ type: ADD_AUTHOR, payload });
export const deleteAuthorAction = (payload) => ({
  type: DELETE_AUTHOR,
  payload,
});
