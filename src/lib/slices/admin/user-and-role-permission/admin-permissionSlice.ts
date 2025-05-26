import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetPermissionDetailResponse } from "@/lib/interface/admin/users/permission/getPermissionDetail";
import { apiAdmin } from "../../../axios/instance";
import { toast } from "@/components/atoms/use-toast";
import { GetPermissionResponse } from "@/lib/interface/admin/users/permission/getPermission";


interface PermissionState {
    permission: GetPermissionResponse;
    loadingPermission: boolean;
    errorPermission: string | null;
}

interface PermissionDetailState {
    permission: GetPermissionDetailResponse;
    loading: boolean;
    error: string | null;
}

const initialState: PermissionState = {
    permission: {
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
    loadingPermission: false,
    errorPermission: null,
};

const initialStateDetail: PermissionDetailState = {
    permission: {
        status: false,
        message: "",
        data: {
            id: "",
            name: "",
            description: "",
            created_at: "",
            updated_at: "",
        },
    },
    loading: false,
    error: null,
};


export const fetchPermissionAll = createAsyncThunk(
    "permission/fetchPermissionAll",
    async () => {
        try {
            const response = await apiAdmin.get("/permissions/all");
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch permission");
        }
    }
);
export const fetchPermission = createAsyncThunk(
    "permission/fetchPermission",
    async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
        try {
            const response = await apiAdmin.get(`/permissions`, {
                params: {
                    pageSize: pageSize || 10,
                    page: page || 1,
                    search: search || "",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch permission");
        }
    }
);
export const fetchPermissionDetail = createAsyncThunk(
    "permission/fetchPermissionDetail",
    async ( id: string ) => {
        try {
            const response = await apiAdmin.get(`/permissions/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch permission detail");
        }
    }
);

export const createPermission = createAsyncThunk(
    "permission/createPermission",
    async (data: FormData) => {
        try {
            const response = await apiAdmin.post("/permissions", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast({
                title: "Success",
                description: response.data.message,
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to create permission";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const updatePermission = createAsyncThunk(
    "permission/updatePermission",
    async ({ id, data }: { id: string; data: FormData }) => {
        try {
            const response = await apiAdmin.put(`/permissions/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast({
                title: "Success",
                description: response.data.message,
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to update permission";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const deletePermission = createAsyncThunk(
    "permission/deletePermission",
    async (id: string) => {
        try {
            const response = await apiAdmin.delete(`/permissions/${id}`);
            toast({
                title: "Success",
                description: response.data.message,
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to delete permission";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.permission.meta.current_page = action.payload;
        },
        setPageSize: (state, action) => {
            state.permission.meta.per_page = action.payload;
        },
        resetPermission: (state) => {
            state.permission = initialState.permission;
            state.loadingPermission = false;
            state.errorPermission = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermission.pending, (state) => {
                state.loadingPermission = true;
            })
            .addCase(fetchPermission.fulfilled, (state, action) => {
                state.loadingPermission = false;
                state.permission = action.payload;
            })
            .addCase(fetchPermission.rejected, (state, action) => {
                state.loadingPermission = false;
                state.errorPermission = action.error.message || "Failed to fetch permission";
            })
            .addCase(fetchPermissionAll.pending, (state) => {
                state.loadingPermission = true;
            })
            .addCase(fetchPermissionAll.fulfilled, (state, action) => {
                state.loadingPermission = false;
                state.permission = action.payload;
            })
            .addCase(fetchPermissionAll.rejected, (state, action) => {
                state.loadingPermission = false;
                state.errorPermission = action.error.message || "Failed to fetch permission";
            })
            .addCase(createPermission.pending, (state) => {
                state.loadingPermission = true;
            })
            .addCase(createPermission.fulfilled, (state, action) => {
                state.loadingPermission = false;
                state.permission.data.push(action.payload.data);
                window.location.reload();
            })
            .addCase(createPermission.rejected, (state, action) => {
                state.loadingPermission = false;
                state.errorPermission = action.error.message || "Failed to create permission";
            })
            .addCase(updatePermission.pending, (state) => {
                state.loadingPermission = true;
            })
            .addCase(updatePermission.fulfilled, (state, action) => {
                state.loadingPermission = false;
                const index = state.permission.data.findIndex((permission) => permission.id === action.payload.data.id);
                if (index !== -1) {
                    state.permission.data[index] = action.payload.data;
                }
                window.location.reload();
            })
            .addCase(updatePermission.rejected, (state, action) => {
                state.loadingPermission = false;
                state.errorPermission = action.error.message || "Failed to update permission";
            })
            .addCase(deletePermission.pending, (state) => {
                state.loadingPermission = true;
            })
            .addCase(deletePermission.fulfilled, (state, action) => {
                state.loadingPermission = false;
                const index = state.permission.data.findIndex((permission) => permission.id === action.payload.data.id);
                if (index !== -1) {
                    state.permission.data.splice(index, 1);
                }
            })
            .addCase(deletePermission.rejected, (state, action) => {
                state.loadingPermission = false;
                state.errorPermission = action.error.message || "Failed to delete permission";
            });
    },
});

export const permissionDetailSlice = createSlice({
    name: "permissionDetail",
    initialState: initialStateDetail,
    reducers: {
        permissionSuccess: (state, action: PayloadAction<GetPermissionDetailResponse>) => {
            state.permission = action.payload;
            state.loading = false;
            state.error = null;
        },
        resetPermission: (state) => {
            state.permission = initialStateDetail.permission;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissionDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPermissionDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.permission = action.payload;
            })
            .addCase(fetchPermissionDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch permission detail";
            });
    },
});

export const {reducer: permissionReducer} = permissionSlice;
export const {reducer: permissionDetailReducer} = permissionDetailSlice;
export const {actions: permissionActions} = permissionSlice;
export const { actions: permissionDetailActions } = permissionDetailSlice;

export const selectPermission = (state: any) => state.permission.permission;
export const selectPermissionLoading = (state: any) => state.permission.loading;
export const selectPermissionError = (state: any) => state.permission.error;

export const selectPermissionDetail = (state: any) => state.permissionDetail.permission;
export const selectPermissionDetailLoading = (state: any) => state.permissionDetail.loading;
export const selectPermissionDetailError = (state: any) => state.permissionDetail.error;

export default {
    permissionSlice: permissionSlice.reducer,
    permissionDetailSlice: permissionDetailSlice.reducer,
}
export const { setPage, setPageSize, resetPermission } = permissionSlice.actions;
export const { resetPermission: resetPermissionDetail } = permissionDetailSlice.actions;
