import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetTools } from "../interface/tools/getTools";
import { api, apiAdmin } from "../axios/instance";
import { toast } from "@/components/atoms/use-toast";
import { Storage } from "../storage";


interface ToolsState {
  tools: GetTools
  loading: boolean;
  error: string | null;
}

// State awal
const initialState: ToolsState = {
  tools: { status: false, message: "", data: { meta: { total: 0, per_page: 0, current_page: 1, last_page: 0, first_page: 0, first_page_url: "", last_page_url: "", next_page_url: "", previous_page_url: "" }, data: [] } },
  loading: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios
export const fetchTools = createAsyncThunk("tools/fetchTools", async (page: number) => {
  try {
    const response = await api.get(`/tools?pageSize=10&page=${page ?? 1}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch tools");
  }
});

// Async thunk untuk fetch data dengan Axios
export const fetchToolsAdmin = createAsyncThunk("tools/fetchToolsAdmin", async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  try {
    const response = await apiAdmin.get(`/tools?pageSize=${size ?? 10}&page=${page ?? 1}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Storage.get('local', 'token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch tools");
  }
});

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.tools.data.meta.current_page = action.payload;
    },
    setPageSize: (state, action) => {
      state.tools.data.meta.per_page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        toast({
          title: "Error",
          variant: "destructive",
          description: action.error.message ?? "Something went wrong",
        })
      });
  },
});

export const { setPage } = toolsSlice.actions;
export default toolsSlice.reducer;