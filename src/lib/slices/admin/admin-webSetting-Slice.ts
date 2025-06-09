import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetWebSettingResponse } from "@/lib/interface/admin/get-webSetting";
import { apiAdmin } from "../../axios/instance";
import { toast } from "@/components/atoms/use-toast";

interface WebSettingState {
  webSetting: GetWebSettingResponse;
  loading: boolean;
  error: string | null;
}

const initialState: WebSettingState = {
  webSetting: {
    status: false,
    message: "",
    setup: {
      id: "",
      name: "",
        tagline: "",
        description: "",
        logo: "",
        favicon: "",
        email: "",
        phone: "",
        address: "",
        social_facebook: "",
        social_instagram: "",
        social_tiktok: "",
        social_twitter: "",
        social_linkedin: "",
        social_youtube: "",
        social_whatsapp: "",
        link_video: "",
        tax_rate: 0,
        feeChannel: 0,
        feeDevelopment: 0,
        created_at: "",
        updated_at: "",
    },
    health: {
      healthy: false,
      report: {
        env: {
          displayName: "",
          health: {
            healthy: false,
          },
        },
        appKey: {
          displayName: "",
          health: {
            healthy: false,
          },
        },
        lucid: {
          displayName: "",
          health: {
            healthy: false,
            message: "",
          },
          meta: []
        },
        redis: {
          displayName: "",
          health: {
            healthy: false,
            message: "",
          },
          meta: []
        },
      },
    },
  },
  loading: false,
  error: null,
};

export const fetchWebSetting = createAsyncThunk(
  "webSetting/fetchWebSetting",
  async () => {
    try {
      const response = await apiAdmin.get("/web");
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch web setting";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const updateWebSetting = createAsyncThunk(
  "webSetting/updateWebSetting",
  async (data: FormData) => {
    try {
      const response = await apiAdmin.put("/web", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
      toast({
        title: "Success",
        description: "Web setting updated successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update web setting";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const updateWebSettingLogo = createAsyncThunk(
  "webSetting/updateWebSettingLogo",
  async (data: FormData) => {
    try {
      const response = await apiAdmin.put("/web/logo", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            // Ensure the correct content type is set for file uploads
        },
    });
      toast({
        title: "Success",
        description: "Logo updated successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update logo";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const updateWebSettingFavicon = createAsyncThunk(
  "webSetting/updateWebSettingFavicon",
  async (data: FormData) => {
    try {
      const response = await apiAdmin.put("/web/favicon", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
      toast({
        title: "Success",
        description: "Favicon updated successfully",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update favicon";
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
);

export const webSettingSlice = createSlice({
  name: "webSetting",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWebSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.webSetting = action.payload;
      })
      .addCase(fetchWebSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch web setting";
      })
      .addCase(updateWebSetting.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWebSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.webSetting = action.payload;
      })
      .addCase(updateWebSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update web setting";
      })
        .addCase(updateWebSettingLogo.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateWebSettingLogo.fulfilled, (state, action) => {
            state.loading = false;
            state.webSetting.setup.logo = action.payload.logo;
        })
        .addCase(updateWebSettingLogo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to update logo";
        }
      )
        .addCase(updateWebSettingFavicon.pending, (state) => {
            state.loading = true;
        }
      )
        .addCase(updateWebSettingFavicon.fulfilled, (state, action) => {
            state.loading = false;
            state.webSetting.setup.favicon = action.payload.favicon;
        }
      )
        .addCase(updateWebSettingFavicon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to update favicon";
        }
      );
  },
});

export const selectWebSetting = (state: { webSetting: WebSettingState }) => state.webSetting.webSetting;
export const selectWebSettingLoading = (state: { webSetting: WebSettingState }) => state.webSetting.loading;
export const selectWebSettingError = (state: { webSetting: WebSettingState }) => state.webSetting.error;
export const selectWebSettingHealth = (state: { webSetting: WebSettingState }) => state.webSetting.webSetting.health;
export const selectWebSettingSetup = (state: { webSetting: WebSettingState }) => state.webSetting.webSetting.setup;


export const { } = webSettingSlice.actions;
export const webSettingReducer = webSettingSlice.reducer;
export default webSettingSlice.reducer;
