import { api } from "@/lib/axios";
import { GetMeResponse } from "@/lib/interface/auth/getMe";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "@/lib/storage";


interface MeState {
  me: GetMeResponse;
  loadingMe: boolean;
  isAuth: boolean;
  error: string | null;
}

// State awal
const initialState: MeState = {
  me: {
    message: "",
    data: {
      user: {
        id: "",
        full_name: "",
        username: "",
        phone: "",
        city: "",
        state: "",
        is_active: 0,
        is_verified: 0,
        avatar: "",
        job_title: "",
        company: "",
        website: "",
        role_id: "",
        team_id: 0,
        email: "",
        created_at: "",
        updated_at: "",
      },
      role: {
        id: "",
        name: "",
        slug: "",
        description: "",
        created_at: "",
        updated_at: "",
      },
    }
  },
  loadingMe: false,
  isAuth: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios
export const fetchMe = createAsyncThunk("me/fetchMe", async () => {
  try {
    const response = await api.get("/user/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    Storage.set('local', 'user', response.data.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch me");
  }
});

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.me.data.user.id = action.payload;
    },
    meSuccess: (state, action: PayloadAction<GetMeResponse>) => {
      state.me = action.payload;
      state.isAuth = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.me.data.user.id = action.payload;
    },
    meFailure: (state, action: PayloadAction<MeState>) => {
      state.error = action.payload.error;
      state.me = {
        message: "",
        data: {
          user: {
            id: "",
            full_name: "",
            username: "",
            phone: "",
            city: "",
            state: "",
            is_active: 0,
            is_verified: 0,
            avatar: "",
            job_title: "",
            company: "",
            website: "",
            role_id: "",
            team_id: 0,
            email: "",
            created_at: "",
            updated_at: "",
          },
          role: {
            id: "",
            name: "",
            slug: "",
            description: "",
            created_at: "",
            updated_at: "",
          },
        }
      };
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loadingMe = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loadingMe = false;
        state.me = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loadingMe = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const { setPage, meSuccess, setToken, meFailure } = meSlice.actions;
export default meSlice.reducer;