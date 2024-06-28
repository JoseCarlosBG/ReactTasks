import * from './types.js'

export const coursesInitialState = [];
// Use the initialState as a default value
export  const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    // in this case we need to return 
    case SAVE_COURSES: return action.payload;
    
    case ADD_COURSE: return [...state, action,payload];
    
    default:
      return state
  }
}