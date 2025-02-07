// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import toolsReducer from '../slices/toolsSlices'; // Sesuaikan path-nya
import loginReducer from '../slices/auth/loginSlice'; // Sesuaikan path-nya
import meReducer from '../slices/auth/meSlice'; // Sesuaikan path-nya
import pathReducer from '../slices/auth/pathSlice'; // Sesuaikan path-nya

export const store = configureStore({
  reducer: {
    tools: toolsReducer,
    login: loginReducer, // Sesuaikan nama reducer dan path-nya
    me: meReducer, // Sesuaikan nama reducer dan path-nya
    path: pathReducer, // Sesuaikan nama reducer dan path-nya
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
