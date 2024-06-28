import * from './types.js'

export const authorsInitialState = [];
// Use the initialState as a default value
export  const authorsReducer = (state = authorsInitialState, action) => {
  switch (action.type) {
    // in this case we need to return 
    case SAVE_AUTHORS: return action.payload;
    
    case ADD_AUTHOR: return [...state, action,payload];
    
    default:
      return state
  }
}