
import { loginSlice } from '@/lib/slices/auth/login/loginSlice';
import { meSlice } from '@/lib/slices/auth/meSlice';
import { pathSlice } from '@/lib/slices/auth/pathSlice';
import {userPermissionSlice} from '@/lib/slices/auth/userPermissionSlice';
import { toolsSlice } from '@/lib/slices/toolsSlices';
import { userDetailSlice, userSlice } from '@/lib/slices/admin/user-and-role-permission/admin-userSlice';
import { webSettingSlice } from '@/lib/slices/admin/admin-webSetting-Slice';
import { configureStore } from '@reduxjs/toolkit';
import { permission } from 'process';
import { roleDetailSlice, roleSlice } from '@/lib/slices/admin/user-and-role-permission/admin-roleSlice';
import { permissionSlice, permissionDetailSlice } from '@/lib/slices/admin/user-and-role-permission/admin-permissionSlice';

export const reduxStore = configureStore({
  reducer: {
    tools: toolsSlice.reducer,
    login: loginSlice.reducer,
    userPermission: userPermissionSlice.reducer,
    me: meSlice.reducer,
    path: pathSlice.reducer,

    users: userSlice.reducer,
    usersDetail: userDetailSlice.reducer,
    roles: roleSlice.reducer,
    rolesDetail: roleDetailSlice.reducer,
    permission: permissionSlice.reducer,
    permissionDetail: permissionDetailSlice.reducer,
    webSetting: webSettingSlice.reducer,
  },
  devTools: false,
});

export type Tstore = typeof reduxStore;
export type TstoreState = ReturnType<Tstore['getState']>;
export type TstoreDispatch = Tstore['dispatch'];
