import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import { productApi } from './action/productApi';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
