// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import toolsReducer from '../slices/toolsSlices'; // Sesuaikan path-nya
import loginReducer from '../slices/auth/login/loginSlice'; // Sesuaikan path-nya
import meReducer from '../slices/auth/meSlice'; // Sesuaikan path-nya
import userPermissionSlice from '../slices/auth/userPermissionSlice'; // Sesuaikan path-nya
import permissionReducer from '../slices/auth/userPermissionSlice'; // Sesuaikan path-nya
import permissionDetailReducer from '../slices/auth/userPermissionSlice'; // Sesuaikan path-nya

import webSettingReducer from '../slices/admin/admin-webSetting-Slice'; // Sesuaikan path-nya
import pathReducer from '../slices/auth/pathSlice'; // Sesuaikan path-nya
import { permission } from 'process';
import { userDetailReducer, usersReducer } from '../slices/admin/user-and-role-permission/admin-userSlice';
import { rolesDetailReducer, rolesReducer } from '../slices/admin/user-and-role-permission/admin-roleSlice';

export const store = configureStore({
    reducer: {
        tools: toolsReducer,
        login: loginReducer, // Sesuaikan nama reducer dan path-nya
        me: meReducer, // Sesuaikan nama reducer dan path-nya
        userPermissionSlice: userPermissionSlice,
        permission: permissionReducer, // Sesuaikan nama reducer dan path-nya
        permissionDetail: permissionDetailReducer, // Sesuaikan nama reducer dan path-nya
        path: pathReducer, // Sesuaikan nama reducer dan path-nya

        users: usersReducer, // Sesuaikan nama reducer dan path-nya
        usersDetail: userDetailReducer, // Sesuaikan nama reducer dan path-nya
        roles: rolesReducer, // Sesuaikan nama reducer dan path-nya
        rolesDetail: rolesDetailReducer, // Sesuaikan nama reducer dan path-nya
        webSetting: webSettingReducer, // Sesuaikan nama reducer dan path-nya
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
