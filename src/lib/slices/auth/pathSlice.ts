import { api } from "@/lib/axios";
import { GetPathResponse } from "@/lib/interface/auth/getPath";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";


interface PathState {
  path: GetPathResponse;
  loading: boolean;
  isAuth: boolean;
  error: string | null;
}

// State awal
const initialState: PathState = {
  path: {
    message: "",
    path: {
      bar: false,
      admin: "/admin/auth",
      user: "/auth",
    }
  },
  loading: false,
  isAuth: false,
  error: null,
};


// Async thunk untuk fetch data dengan Axios get path
export const fetchPath = createAsyncThunk("path/fetchPath", async () => {
  try {
    const response = await api.get("/path",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Storage.get('local', 'token') ?? null}` // tambahkan header ini jika ada auth
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch path");
  }
});

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPath.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPath.fulfilled, (state, action) => {
        state.path = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(fetchPath.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export const { setPath } = pathSlice.actions;
export default pathSlice.reducer;