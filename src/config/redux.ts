
import { loginSlice } from '@/lib/slices/auth/loginSlice';
import { meSlice } from '@/lib/slices/auth/meSlice';
import { pathSlice } from '@/lib/slices/auth/pathSlice';
import { toolsSlice } from '@/lib/slices/toolsSlices';
import { configureStore } from '@reduxjs/toolkit';

export const reduxStore = configureStore({
  reducer: {
    tools: toolsSlice.reducer,
    login: loginSlice.reducer,
    me: meSlice.reducer,
    path: pathSlice.reducer,
  },
  devTools: false,
});

export type Tstore = typeof reduxStore;
export type TstoreState = ReturnType<Tstore['getState']>;
export type TstoreDispatch = Tstore['dispatch'];
