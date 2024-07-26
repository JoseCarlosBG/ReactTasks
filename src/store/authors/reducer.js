import { SAVE_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR } from './types';

const initialState = [];

const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AUTHORS:
      return action.payload;
    case ADD_AUTHOR:
      return [...state, action.payload];
    case DELETE_AUTHOR:
      return state.filter(author => author.id !== action.payload);
    default:
      return state;
  }
};

export default authorsReducer;
