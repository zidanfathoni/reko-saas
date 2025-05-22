import { api } from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";
import { GetPermissionResponse } from "@/lib/interface/auth/getPermission";
import { apiAdmin } from "@/lib/axios/instance";


interface PermissionState {
  permission: GetPermissionResponse;
  loadingPermission: boolean;
  error: string | null;
}

// State awal
const initialState: PermissionState = {
    permission: {
    status: false,
    message: "",
    data: {
        id: "",
        name: "",
        description: "",
        created_at: "",
        updated_at: "",
        permissions: [],
    }
  },
  loadingPermission: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios
export const fetchPermission = createAsyncThunk("permissions/fetchPermission", async () => {
  try {
    const response = await apiAdmin.get("/user/permissions");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Permissions");
  }
});

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.permission.data.id = action.payload;
    },
    success: (state, action: PayloadAction<GetPermissionResponse>) => {
        state.permission = action.payload;
        state.loadingPermission = false;
        state.error = null;

    },
    failure: (state, action: PayloadAction<PermissionState>) => {
      state.error = action.payload.error;
      state.permission = {
        status: false,
        message: "",
        data: {
            id: "",
            name: "",
            description: "",
            created_at: "",
            updated_at: "",
            permissions: [],
        }
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermission.pending, (state) => {
        state.loadingPermission = true;
        state.error = null;
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.loadingPermission = false;
        state.permission = action.payload;
      })
      .addCase(fetchPermission.rejected, (state, action) => {
        state.loadingPermission = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const { setPage, success, failure } = permissionSlice.actions;
export default permissionSlice.reducer;
