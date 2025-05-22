
import { loginSlice } from '@/lib/slices/auth/login/loginSlice';
import { meSlice } from '@/lib/slices/auth/meSlice';
import { pathSlice } from '@/lib/slices/auth/pathSlice';
import {permissionSlice} from '@/lib/slices/auth/permissionSlice';
import { toolsSlice } from '@/lib/slices/toolsSlices';
import { userSlice } from '@/lib/slices/admin/admin-userSlice';
import { webSettingSlice } from '@/lib/slices/admin/admin-webSetting-Slice';
import { configureStore } from '@reduxjs/toolkit';
import { permission } from 'process';

export const reduxStore = configureStore({
  reducer: {
    tools: toolsSlice.reducer,
    login: loginSlice.reducer,
    permission: permissionSlice.reducer,
    me: meSlice.reducer,
    path: pathSlice.reducer,

    users: userSlice.reducer,
    webSetting: webSettingSlice.reducer,
  },
  devTools: false,
});

export type Tstore = typeof reduxStore;
export type TstoreState = ReturnType<Tstore['getState']>;
export type TstoreDispatch = Tstore['dispatch'];
