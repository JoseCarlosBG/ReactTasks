// src/store/authors/reducer.js

import { SAVE_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR } from './types';

export const authorsInitialState = [];

// Use the initialState as a default value
const authorsReducer = (state = authorsInitialState, action) => {
  switch (action.type) {
    case SAVE_AUTHORS:
      return action.payload;
    
    case ADD_AUTHOR:
      return [...state, action.payload];
    
    default:
      return state;
  }
};

export default authorsReducer;