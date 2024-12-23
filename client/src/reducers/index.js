// src/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Assuming userReducer.js is in the same folder

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
