import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetRolesResponse } from "@/lib/interface/admin/users/roles/getRoles";
import {  apiAdmin } from "../../../axios/instance";
import { toast } from "@/components/atoms/use-toast";
import { GetRolesDetailResponse } from "@/lib/interface/admin/users/roles/getRolesDetail";
import { create } from "domain";

interface RolesState {
    roles: GetRolesResponse;
    loading: boolean;
    error: string | null;
}

interface RolesDetailState {
    roles: GetRolesDetailResponse;
    loading: boolean;
    error: string | null;
}

const initialState: RolesState = {
    roles: {
        status: false,
        message: "",
        data: [],
        meta: {
            total: 0,
            per_page: 0,
            current_page: 0,
            last_page: 0,
            first_page: 0,
            first_page_url: "",
            last_page_url: "",
            next_page_url: "",
            previous_page_url: "",
        },
    },
    loading: false,
    error: null,
};

const initialStateDetail: RolesDetailState = {
    roles: {
        status: false,
        message: "",
        data: {
            id: "",
            name: "",
            description: "",
            created_at: "",
            updated_at: "",
            permissions: [],
        },
    },
    loading: false,
    error: null,
};

export const fetchRolesAll = createAsyncThunk(
    "roles/fetchRolesAll",
    async () => {
        try {
            const response = await apiAdmin.get("/roles/all");
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch roles";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const fetchRoles = createAsyncThunk(
    "roles/fetchRoles",
    async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
        try {
            const response = await apiAdmin.get(
                `/roles?pageSize=${pageSize || 10}&page=${page || 1}&search=${search || ""}`
            );
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch roles";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const fetchRolesDetail = createAsyncThunk(
    "roles/fetchRolesDetail",
    async (id: string) => {
        try {
            const response = await apiAdmin.get(`/roles/${id}`);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch role details";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const createrole = createAsyncThunk(
    "roles/createrole",
    async (data: string) => {
        try {
            const response = await apiAdmin.post("/roles", data);
            toast({
                title: "Success",
                description: "Role created successfully",
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to create role";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const updaterole = createAsyncThunk(
    "roles/updaterole",
    async ({ id, data }: { id: string; data: string }) => {
        try {
            const response = await apiAdmin.put(`/roles/${id}`, data);
            toast({
                title: "Success",
                description: "Role updated successfully",
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to update role";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const deleterole = createAsyncThunk(
    "roles/deleterole",
    async (ids: string[]) => {
        try {
            const response = await apiAdmin.delete(`/roles`, {
                data: {
                    role_ids: ids,
                },
            });
            toast({
                title: "Success",
                description: "Role deleted successfully",
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to delete role";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);


export const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.roles.meta.current_page = action.payload;
        },
        setPageSize: (state, action) => {
            state.roles.meta.per_page = action.payload;
        },
        resetRolesState: (state) => {
            state.roles = initialState.roles;
            state.loading = false;
            state.error = null;
        },
        createroleSuccess: (state, action) => {
            state.roles.data.push(action.payload.data);
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRolesAll.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.data = action.payload.data;
                state.roles.meta = action.payload.meta;
            })
            .addCase(fetchRolesAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch all roles";
            })
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch roles";
            })
            .addCase(fetchRolesDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRolesDetail.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.roles.data.findIndex((role) => role.id === action.payload.data.id);
                if (index !== -1) {
                    state.roles.data[index] = action.payload.data;
                }
            })
            .addCase(createrole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createrole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.data.push(action.payload.data);
                window.location.href = "/admin/roles"; // Redirect to roles page after creation
            })
            .addCase(createrole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create role";
            })
            .addCase(updaterole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updaterole.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.roles.data.findIndex((role) => role.id === action.payload.data.id);
                if (index !== -1) {
                    state.roles.data[index] = action.payload.data;
                }
                window.location.href = "/admin/roles"; // Redirect to roles page after update
            })
            .addCase(updaterole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update role";
            })
            .addCase(deleterole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleterole.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.roles.data.findIndex((role) => role.id === action.payload.data.id);
                if (index !== -1) {
                    state.roles.data.splice(index, 1);
                }
            }
            )
            .addCase(deleterole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete role";
            }
            );
    },
});

export const roleDetailSlice = createSlice({
    name: "rolesDetail",
    initialState: initialStateDetail,
    reducers: {
        resetRolesDetailState: (state) => {
            state.roles = initialStateDetail.roles;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRolesDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRolesDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch role details";
            });
    }
})


export const { reducer: rolesReducer } = roleSlice;
export const { reducer: rolesDetailReducer } = roleDetailSlice;
export const { actions: rolesActions } = roleSlice;
export const selectRoles = (state: { roles: RolesState }) => state.roles.roles;
export const selectLoading = (state: { roles: RolesState }) => state.roles.loading;
export const selectError = (state: { roles: RolesState }) => state.roles.error;

export const selectRolesDetail = (state: { rolesDetail: RolesDetailState }) => state.rolesDetail.roles;
export const selectLoadingDetail = (state: { rolesDetail: RolesDetailState }) => state.rolesDetail.loading;
export const selectErrorDetail = (state: { rolesDetail: RolesDetailState }) => state.rolesDetail.error;


export default {
    roleReducer: roleSlice.reducer,
    roleDetailReducer: roleDetailSlice.reducer,
};
export const { setPage, setPageSize, resetRolesState } = roleSlice.actions;
export const { resetRolesDetailState } = roleDetailSlice.actions;
