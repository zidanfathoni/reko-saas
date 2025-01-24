// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import toolsReducer from '../slices/toolsSlices'; // Sesuaikan path-nya

export const store = configureStore({
  reducer: {
    tools: toolsReducer, // Sesuaikan nama slice reducer-nya
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
