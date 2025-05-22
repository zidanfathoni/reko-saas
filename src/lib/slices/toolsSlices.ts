import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetTools } from "../interface/tools/getTools";
import { api, apiAdmin } from "../axios/instance";
import { toast } from "@/components/atoms/use-toast";

interface ToolsState {
  tools: GetTools;
  loading: boolean;
  error: string | null;
}

const initialState: ToolsState = {
  tools: {
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

export const fetchTools = createAsyncThunk(
  "tools/fetchTools",
  async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
    try {
      const response = await api.get(
        `/tools?pageSize=${pageSize || 10}&page=${page || 1}&search=${search || ""}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch tools";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const fetchToolsDetail = createAsyncThunk(
  "tools/fetchToolsDetail",
  async (id: string) => {
    try {
      const response = await api.get(`/tools/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch tool details";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const fetchToolsPost = createAsyncThunk(
  "tools/fetchToolsPost",
  async (data: FormData) => {
    try {
      const response = await apiAdmin.post("/tools", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Success",
        description: "Tool created successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to create tool";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const fetchToolsUpdate = createAsyncThunk(
  "tools/fetchToolsUpdate",
  async (data: FormData) => {
    try {
      const id = data.get("id");
      const response = await apiAdmin.put(`/tools/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Success",
        description: "Tool updated successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update tool";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const fetchToolsDelete = createAsyncThunk(
  "tools/fetchToolsDelete",
  async (id: string) => {
    try {
      const response = await apiAdmin.delete(`/tools/${id}`);
      toast({
        title: "Success",
        description: "Tool deleted successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete tool";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.tools.meta.current_page = action.payload;
    },
    setPageSize: (state, action) => {
      state.tools.meta.per_page = action.payload;
    },
    resetToolsState: (state) => {
      state.tools = initialState.tools;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tools
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
        state.error = action.error.message ?? "Failed to fetch tools";
      })

      // Fetch Tools Detail
      .addCase(fetchToolsDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsDetail.fulfilled, (state, action) => {
        state.loading = false;
        // Jika Anda ingin menyimpan detail tool di state, tambahkan logic di sini
      })
      .addCase(fetchToolsDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tool details";
      })

      // Post Tool
      .addCase(fetchToolsPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchToolsPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create tool";
      })

      // Update Tool
      .addCase(fetchToolsUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsUpdate.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchToolsUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update tool";
      })

      // Delete Tool
      .addCase(fetchToolsDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsDelete.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchToolsDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete tool";
      });
  },
});

export const { setPage, setPageSize, resetToolsState } = toolsSlice.actions;
export default toolsSlice.reducer;
