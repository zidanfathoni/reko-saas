import { api } from "@/lib/axios";
import { GetLoginResponse } from "@/lib/interface/auth/getLogin";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";
import { fetchMe } from "../meSlice";
import { toast } from "@/components/atoms/use-toast";



interface ToolsState {
  login: GetLoginResponse;
  loading: boolean;
  isAuth: boolean;
  error: string | null;
}

// State awal
const initialState: ToolsState = {
  login: {
    status: false,
    message: "",
    data: {
      token: '',
      refreshToken: '',
      path: "",
    },},
  loading: false,
  isAuth: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios post email and password. menggunakan formData
export const fetchLogin = createAsyncThunk("login/fetchLogin", async (data: FormData) => {
  try {
    const response = await api.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const cookies = response.headers['set-cookie'];
    //save cookies to local storage
    if (cookies) {
      Storage.set('cookie', 'token', cookies.find((cookie: string) => cookie.includes('token')));
      Storage.set('cookie', 'refreshToken', cookies.find((cookie: string) => cookie.includes('refreshToken')));
      Storage.set('cookie', 'path', cookies.find((cookie: string) => cookie.includes('path')));
    }
    Storage.set('local', 'token', response.data.data.token);
    Storage.set('local', 'refreshToken', response.data.data.refreshToken);
    Storage.set('local', 'path', response.data.data.path);


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
      Storage.set('cookie', 'token', cookies.find((cookie: string) => cookie.includes('token')));
        Storage.set('cookie', 'refreshToken', cookies.find((cookie: string) => cookie.includes('refreshToken')));
      Storage.set('cookie', 'path', cookies.find((cookie: string) => cookie.includes('path')));
    }

    Storage.set('local', 'token', response.data.data.token);
    Storage.set('local', 'refreshToken', response.data.data.refreshToken);
    Storage.set('local', 'path', response.data.data.path);


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
      state.login.data.token = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<GetLoginResponse>) => {
      state.login = action.payload;
      state.isAuth = true;
      console.log('login success');

    },
    setToken: (state, action: PayloadAction<string>) => {
      state.login.data.token = action.payload;
    },
    loginFailure: (state, action: PayloadAction<ToolsState>) => {
      state.error = action.payload.error;
      state.login = {
        status: false,
        message: "",
        data: {
          token: '',
          refreshToken: '',
          path: "",
        },},
      state.isAuth = false;
    },
    logout: (state) => {
      state.login = {
        status: false,
        message: "",
        data: {
          token: '',
          refreshToken: '',
          path: "",
        },},
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
        const path = action.payload.data.path;
        toast({
          title: "Login Successful",
          description: `Welcome back! You are logged in as ${path}.`,
        });
        if (path !== "user") {
          window.location.href = `/admin`;
        } else {
          window.location.href = `/dashboard`;
        }
        // Fetch user data after successful login
        fetchMe();
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";

      });
  },
});

export const { setPage, loginSuccess, setToken, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
