import { api } from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";
import { GetPermissionResponse } from "@/lib/interface/auth/getPermission";
import { apiAdmin } from "@/lib/axios/instance";


interface UserPermissionState {
  userPermission: GetPermissionResponse;
  loadingPermission: boolean;
  error: string | null;
}

// State awal
const initialState: UserPermissionState = {
    userPermission: {
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
export const fetchUserPermission = createAsyncThunk("permissions/fetchPermission", async () => {
  try {
    const response = await apiAdmin.get("/user/permissions");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Permissions");
  }
});

export const userPermissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.userPermission.data.id = action.payload;
    },
    success: (state, action: PayloadAction<GetPermissionResponse>) => {
        state.userPermission = action.payload;
        state.loadingPermission = false;
        state.error = null;

    },
    failure: (state, action: PayloadAction<UserPermissionState>) => {
      state.error = action.payload.error;
      state.userPermission = {
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
      .addCase(fetchUserPermission.pending, (state) => {
        state.loadingPermission = true;
        state.error = null;
      })
      .addCase(fetchUserPermission.fulfilled, (state, action) => {
        state.loadingPermission = false;
        state.userPermission = action.payload;
      })
      .addCase(fetchUserPermission.rejected, (state, action) => {
        state.loadingPermission = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const { setPage, success, failure } = userPermissionSlice.actions;
export default userPermissionSlice.reducer;
