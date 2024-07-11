// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Adjust the import path as necessary

// Configure the Redux store
const store = configureStore({ reducer: rootReducer });

export default store;
