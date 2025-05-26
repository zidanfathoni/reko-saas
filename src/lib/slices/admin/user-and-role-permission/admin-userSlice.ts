import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUsersResponse } from "@/lib/interface/admin/users/getUsers";
import { api, apiAdmin } from "../../../axios/instance";
import { toast } from "@/components/atoms/use-toast";
import { GetUsersDetailResponse } from "@/lib/interface/admin/users/getUsers-detail";

interface UsersState {
  users: GetUsersResponse;
  loading: boolean;
  error: string | null;
}

interface UsersDetailState {
    userDetail: GetUsersDetailResponse;
    loadingUserDetail: boolean;
    errorUserDetail: string | null;
}


const initialState: UsersState = {
  users: {
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

const initialUserDetailState: UsersDetailState = {
  userDetail: {
    status: false,
    message: "",
    data: {
      id: "",
      full_name: "",
      username: "",
      phone: "",
      is_verified_number: 0,
      is_active: 0,
      email: "",
      is_verified: 0,
      provider: "",
      provider_id: "",
      remember_me_token: "",
      role_id: "",
      avatar: "",
      job_title: "",
      created_at: "",
      updated_at: "",
    },
  },
  loadingUserDetail: false,
  errorUserDetail: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
    try {
      const response = await apiAdmin.get(
        `/users?pageSize=${pageSize || 10}&page=${page || 1}&search=${search || ""}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const fetchUsersDetail = createAsyncThunk(
  "users/fetchUsersDetail",
  async (id: string) => {
    try {
      const response = await apiAdmin.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user details";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: FormData) => {
    try {
      const response = await apiAdmin.post("/users", data);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to create user";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: { id: string; data: FormData }) => {
    try {
      const response = await apiAdmin.put(`/users/${id}`, data);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update user";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await apiAdmin.delete(`/users/${id}`);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete user";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "users/resetUserPassword",
  async (id: string) => {
    try {
      const response = await apiAdmin.post(`/users/${id}/reset-password`);
      toast({
        title: "Success",
        description: "User password reset successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to reset user password";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.users.meta.current_page = action.payload;
    },
    setPageSize: (state, action) => {
      state.users.meta.per_page = action.payload;
    },
    resetUsersState: (state) => {
      state.users = initialState.users;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.data.push(action.payload.data);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.data.findIndex((user) => user.id === action.payload.data.id);
        if (index !== -1) {
          state.users.data[index] = action.payload.data;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled , (state, action) => {
        state.loading = false;
        const index = state.users.data.findIndex((user) => user.id === action.payload.data.id);
        if (index !== -1) {
          state.users.data.splice(index, 1);
        }
      }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user";
      }
      )
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.data.findIndex((user) => user.id === action.payload.data.id);
        if (index !== -1) {
          state.users.data[index] = action.payload.data;
        }
      }
      )
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to reset user password";
      }
      );
  },
});

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: initialUserDetailState,
  reducers: {
    resetUserDetailState: (state) => {
      state.userDetail = initialUserDetailState.userDetail;
      state.loadingUserDetail = false;
      state.errorUserDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersDetail.pending, (state) => {
        state.loadingUserDetail = true;
        state.errorUserDetail = null;
      })
      .addCase(fetchUsersDetail.fulfilled, (state, action) => {
        state.loadingUserDetail = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUsersDetail.rejected, (state, action) => {
        state.loadingUserDetail = false;
        state.errorUserDetail = action.error.message || "Failed to fetch user details";
      });
  },
});


export const { reducer: usersReducer } = userSlice;
export const { reducer: userDetailReducer } = userDetailSlice;

export const { actions: usersActions } = userSlice;
export const { actions: userDetailActions } = userDetailSlice;

export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectLoading = (state: { users: UsersState }) => state.users.loading;
export const selectError = (state: { users: UsersState }) => state.users.error;
export const selectUserById = (state: { users: UsersState }, id: string) =>
  state.users.users.data.find((user) => user.id === id);
export const selectUserByEmail = (state: { users: UsersState }, email: string) =>
  state.users.users.data.find((user) => user.email === email);

export const selectUserDetail = (state: { userDetail: UsersDetailState }) => state.userDetail.userDetail;
export const selectUserDetailLoading = (state: { userDetail: UsersDetailState }) => state.userDetail.loadingUserDetail;
export const selectUserDetailError = (state: { userDetail: UsersDetailState }) => state.userDetail.errorUserDetail;

export default {
    usersReducer,
    userDetailReducer,
}
export const { setPage, setPageSize, resetUsersState } = userSlice.actions;
export const { resetUserDetailState } = userDetailSlice.actions;
