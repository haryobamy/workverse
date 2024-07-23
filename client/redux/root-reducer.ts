import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authSlice from './features/auth/authSlice';
import todoSlice from './features/todo/todoSlice';

export const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  todo: todoSlice,
});
