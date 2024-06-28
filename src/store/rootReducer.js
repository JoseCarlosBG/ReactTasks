import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { coursesReducer } from './courses/reducer.js' // reducer that we already have
import { authorsReducer } from './authors/reducer.js' // reducer that we already have
import { usersReducer } from './users/reducer.js' // reducer that we already have

const rootReducer = combineReducers({
  courses: coursesReducer,
  authors: authorsReducer,
  users: usersReducer,
  //could be extended by another slice of reducer that respond for other part of your app
});

export default rootReducer;