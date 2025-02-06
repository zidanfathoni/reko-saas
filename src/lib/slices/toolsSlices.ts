import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetTools } from "../interface/tools/getTools";
import { api } from "../axios/instance";
import { toast } from "@/components/atoms/use-toast";


interface ToolsState {
  tools: GetTools
  loading: boolean;
  error: string | null;
}

// State awal
const initialState: ToolsState = {
  tools: { data: [], meta: { pagination: { page: 0, pageSize: 0, pageCount: 0, total: 0 } } },
  loading: false,
  error: null,
};

// Async thunk untuk fetch data dengan Axios
export const fetchTools = createAsyncThunk("tools/fetchTools", async (page: number) => {
  try {
    const response = await api.get(`/tools?pagination[pageSize]=12&pagination[page]=${page ?? 1}`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        populate: "link.link",
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
      state.tools.meta.pagination.page = action.payload;
    },
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