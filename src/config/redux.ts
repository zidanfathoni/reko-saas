
import { toolsSlice } from '@/lib/slices/toolsSlices';
import { configureStore } from '@reduxjs/toolkit';

export const reduxStore = configureStore({
  reducer: {
    tools: toolsSlice.reducer,
  },
  devTools: false,
});

export type Tstore = typeof reduxStore;
export type TstoreState = ReturnType<Tstore['getState']>;
export type TstoreDispatch = Tstore['dispatch'];
