import { api } from "@/lib/axios";
import { GetLoginResponse } from "@/lib/interface/auth/getLogin";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";
import { fetchMe } from "../meSlice";


interface ToolsState {
  login: GetLoginResponse;
  loading: boolean;
  isAuth: boolean;
  error: string | null;
}

// State awal
const initialState: ToolsState = {
  login: { status: false, message: "", data: { token: { type: "", token: "", expires_at: "" }, role: "" } },
  loading: false,
  isAuth: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios post email and password. menggunakan formData
export const fetchLogin = createAsyncThunk("login/fetchLogin", async (data: FormData) => {
  try {
    const response = await api.post("/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    Storage.set('local', 'login', response.data.data);
    Storage.set('local', 'token', response.data.data.token.token);
    Storage.set('local', 'role', response.data.data.role);


    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch login");
  }
});

export const fetchLoginAdmin = createAsyncThunk("login/fetchLoginAdmin", async (data: FormData) => {
  try {
    const response = await api.post("/admin/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cookies = response.headers['set-cookie'];

    //save cookies to local storage
    if (cookies) {
      Storage.set('session', 'token', cookies.find((cookie: string) => cookie.includes('token')));
      Storage.set('session', 'role', cookies.find((cookie: string) => cookie.includes('role')));
    }

    Storage.set('local', 'login', response.data.data);
    Storage.set('local', 'token', response.data.data.token.token);
    Storage.set('local', 'role', response.data.data.role);


    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch login");
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.login.data.token.token = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<GetLoginResponse>) => {
      state.login = action.payload;
      state.isAuth = true;
      console.log('login success');
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.login.data.token.token = action.payload;
    },
    loginFailure: (state, action: PayloadAction<ToolsState>) => {
      state.error = action.payload.error;
      state.login = { status: false, message: "", data: { token: { type: "", token: "", expires_at: "" }, role: "" } };
      state.isAuth = false;
    },
    logout: (state) => {
      state.login = { status: false, message: "", data: { token: { type: "", token: "", expires_at: "" }, role: "" } };
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const { setPage, loginSuccess, setToken, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;