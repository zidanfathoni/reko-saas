import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetTools } from "../interface/tools/getTools";
import { api, apiAdmin } from "../axios/instance";
import { toast } from "@/components/atoms/use-toast";
import { GetToolsDetailResponse } from "../interface/tools/getToolsDetail";

interface ToolsState {
  tools: GetTools;
  loading: boolean;
  error: string | null;
}

interface ToolsDetailState {
    toolsDetail: GetToolsDetailResponse;
    loadingDetail: boolean;
    errorDetail: string | null;
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

const initialDetailState: ToolsDetailState = {
  toolsDetail: {
    status: false,
    message: "",
    data: {
      id: "",
      name: "",
      slug: "",
      icon: "",
      description: "",
      link_label: "",
      link_url: "",
      link_target: "",
      created_at: "",
      updated_at: "",
    },
  },
  loadingDetail: false,
  errorDetail: null,
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
  async (slug: string) => {
    try {
      const response = await api.get(`/tools/${slug}`);
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
  async ({ id, data }: { id: string; data: FormData }) => {
    try {
      const response = await apiAdmin.put(`/tools/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Success",
        description: response.data.message,
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
  async (id: string[]) => {
    try {
      const response = await apiAdmin.delete(`/tools`, {
        data: { ids: id },
      });
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

      // Post Tool
      .addCase(fetchToolsPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsPost.fulfilled, (state,action) => {
        state.loading = false;
        state.tools.data.push(action.payload.data);
        state.tools.meta.total += 1; // Increase total count
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
      .addCase(fetchToolsUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tools.data.findIndex(tool => tool.id === action.payload.data.id);
        if (index !== -1) {
          state.tools.data[index] = action.payload.data;
        }
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
      .addCase(fetchToolsDelete.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = action.payload.data.map((tool: { id: string }) => tool.id);
        state.tools.data = state.tools.data.filter(tool => !deletedIds.includes(tool.id));
        state.tools.meta.total -= deletedIds.length; // Decrease total count
      })
      .addCase(fetchToolsDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete tool";
      });
  },
});

export const toolsDetailSlice = createSlice({
    name: "toolsDetail",
    initialState: initialDetailState,
    reducers: {
      resetToolsDetailState: (state) => {
        state.toolsDetail = initialDetailState.toolsDetail;
        state.loadingDetail = false;
        state.errorDetail = null;
      },
    },
    extraReducers: (builder) => {
      // Fetch Tools Detail
      builder
        .addCase(fetchToolsDetail.pending, (state) => {
          state.loadingDetail = true;
          state.errorDetail = null;
        })
        .addCase(fetchToolsDetail.fulfilled, (state, action) => {
          state.loadingDetail = false;
          state.toolsDetail = action.payload;
        })
        .addCase(fetchToolsDetail.rejected, (state, action) => {
          state.loadingDetail = false;
          state.errorDetail = action.error.message ?? "Failed to fetch tool details";
        });
    },
});

export const {reducer: toolsReducer} = toolsSlice;
export const {reducer: toolsDetailReducer} = toolsDetailSlice;
export const {actions: toolsActions} = toolsSlice;
export const {actions: toolsDetailActions} = toolsDetailSlice;

export const selectTools = (state: { tools: ToolsState }) => state.tools;
export const selectToolsDetail = (state: { toolsDetail: ToolsDetailState }) => state.toolsDetail;

export default {
    tools: toolsSlice.reducer,
    toolsDetail: toolsDetailSlice.reducer,
}

export const { setPage, setPageSize, resetToolsState } = toolsSlice.actions;
export const { resetToolsDetailState } = toolsDetailSlice.actions;
