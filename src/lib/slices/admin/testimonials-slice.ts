import { toast } from "@/components/atoms/use-toast";
import { api, apiAdmin } from "@/lib/axios/instance";
import { GetTestimonials } from "@/lib/interface/testimonials/getTestimonials";
import { GetTestimonialsDetailResponse } from "@/lib/interface/testimonials/getTestimonialsDetail";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface TestimonialsState {
  testimonials: GetTestimonials;
  loading: boolean;
  error: string | null;
}

interface TestimonialsDetailState {
  testimonialsDetail: GetTestimonialsDetailResponse;
  loadingDetail: boolean;
  errorDetail: string | null;
}

const initialState: TestimonialsState = {
  testimonials: {
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
const initialDetailState: TestimonialsDetailState = {
  testimonialsDetail: {
    status: false,
    message: "",
    data: {
      id: "",
      name: "",
      job_title: "",
      company: "",
      message: "",
      link: "",
      created_at: "",
      updated_at: "",
    },
    },
    loadingDetail: false,
    errorDetail: null,
};

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
    try {
        const response = await apiAdmin.get(`/testimonials`, {
            params: {
                pageSize: pageSize || 10,
                page: page || 1,
                search: search || "",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch testimonials");
    }
  }
);

export const fetchTestimonialsDetail = createAsyncThunk(
  "testimonials/fetchTestimonialsDetail",
  async (id: string) => {
    try {
      const response = await apiAdmin.get(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch testimonials detail");
    }
  }
);

export const createTestimonials = createAsyncThunk(
  "testimonials/createTestimonials",
  async (data: FormData) => {
    try {
      const response = await api.post(`/testimonials`, data, {
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
        const errorMessage = error.response?.data?.message || "Failed to create testimonial";
        toast({
          title: "Error",
          variant: "destructive",
          description: errorMessage,
        });
        throw new Error(errorMessage);
    }
  }
);

export const updateTestimonials = createAsyncThunk(
  "testimonials/updateTestimonials",
  async ({ id, data }: { id: string; data: FormData }) => {
    try {
      const response = await apiAdmin.post(`/testimonials/${id}`, data, {
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
        const errorMessage = error.response?.data?.message || "Failed to update testimonial";
        toast({
          title: "Error",
          variant: "destructive",
          description: errorMessage,
        });
        throw new Error(errorMessage);
    }
  }
);

export const deleteTestimonials = createAsyncThunk(
  "testimonials/deleteTestimonials",
  async (id: string[]) => {
    try {
      const response = await apiAdmin.delete(`/testimonials`, {
        data: { ids: id },
      });
      return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to delete testimonial";
        toast({
          title: "Error",
          variant: "destructive",
          description: errorMessage,
        });
        throw new Error(errorMessage);
    }
  }
);

export const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.testimonials.meta.current_page = action.payload;
    },
    setPageSize: (state, action) => {
      state.testimonials.meta.per_page = action.payload;
    },
    resetTestimonialsState: (state) => {
      state.testimonials = initialState.testimonials;
      state.loading = false;
      state.error = null;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      })
      .addCase(createTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.data.push(action.payload.data);
        state.testimonials.meta.total += 1; // Update total count
      }
      )
      .addCase(createTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create testimonial";
      }
      )
      .addCase(updateTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(updateTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.testimonials.data.findIndex(testimonial => testimonial.id === action.payload.data.id);
        if (index !== -1) {
          state.testimonials.data[index] = action.payload.data; // Update existing testimonial
        } else {
          state.testimonials.data.push(action.payload.data); // Add new testimonial if not found
        }
      }
      )
      .addCase(updateTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update testimonial";
      }
      )
      .addCase(deleteTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(deleteTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        const deleteIds = action.payload.data.map((testimonial: { id: string }) => testimonial.id);
        state.testimonials.data = state.testimonials.data.filter(
          (testimonial) => !deleteIds.includes(testimonial.id)
        );
        state.testimonials.meta.total -= deleteIds.length; // Update total count
        if (state.testimonials.meta.total < 0) {
          state.testimonials.meta.total = 0; // Ensure total does not go negative
        }
      }
      )
      .addCase(deleteTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete testimonial";
      }
      );
  }
});
export const testimonialsDetailSlice = createSlice({
    name: "testimonialsDetail",
    initialState: initialDetailState,
    reducers: {
        testimonialsSuccess: (state, action) => {
            state.testimonialsDetail = action.payload;
            state.loadingDetail = false;
            state.errorDetail = null;
        }
        ,
        resetTestimonialsDetailState: (state) => {
            state.testimonialsDetail = initialDetailState.testimonialsDetail;
            state.loadingDetail = false;
            state.errorDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTestimonialsDetail.pending, (state) => {
            state.loadingDetail = true;
            state.errorDetail = null;
        })
        .addCase(fetchTestimonialsDetail.fulfilled, (state, action) => {
            state.testimonialsDetail = action.payload;
            state.loadingDetail = false;
        })
        .addCase(fetchTestimonialsDetail.rejected, (state, action) => {
            state.loadingDetail = false;
            state.errorDetail = action.error.message || "Failed to fetch testimonials detail";
        });
    }
    });

    export const {reducer: testimonialsReducer,actions: testimonialsActions} = testimonialsSlice;
export const {reducer: testimonialsDetailReducer, actions: testimonialsDetailActions} = testimonialsDetailSlice;

export const selectTestimonials = (state: { testimonials: TestimonialsState }) => state.testimonials.testimonials;
export const selectTestimonialsLoading = (state: { testimonials: TestimonialsState }) => state.testimonials.loading;
export const selectTestimonialsError = (state: { testimonials: TestimonialsState }) => state.testimonials.error;
export const selectTestimonialsDetail = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.testimonialsDetail;
export const selectTestimonialsDetailLoading = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.loadingDetail;
export const selectTestimonialsDetailError = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.errorDetail;
export const selectTestimonialsMeta = (state: { testimonials: TestimonialsState }) => state.testimonials.testimonials.meta;
export const selectTestimonialsData = (state: { testimonials: TestimonialsState }) => state.testimonials.testimonials.data;
export const selectTestimonialsDetailData = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.testimonialsDetail.data;
export const selectTestimonialsDetailStatus = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.testimonialsDetail.status;
export const selectTestimonialsDetailMessage = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.testimonialsDetail.message;
export const selectTestimonialsDetailId = (state: { testimonialsDetail: TestimonialsDetailState }) => state.testimonialsDetail.testimonialsDetail.data.id;

export default {
    testimonials: testimonialsReducer,
    testimonialsDetail: testimonialsDetailReducer,
}

export const { setPage, setPageSize, resetTestimonialsState } = testimonialsSlice.actions;
export const { testimonialsSuccess, resetTestimonialsDetailState } = testimonialsDetailSlice.actions;
