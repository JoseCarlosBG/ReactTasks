import * from './types.js'

export const usersInitialState = [];
// Use the initialState as a default value
export  const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    // in this case we need to return 
    case SAVE_USERS: return action.payload;
    
    case ADD_USER: return [...state, action,payload];
    
    default:
      return state
  }
}