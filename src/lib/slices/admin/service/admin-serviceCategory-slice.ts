import { toast } from "@/components/atoms/use-toast";
import { api, apiAdmin } from "@/lib/axios/instance";
import { GetServiceCategoryResponse } from "@/lib/interface/admin/service/getServiceCategory";
import { GetServiceCategoryDetailResponse } from "@/lib/interface/admin/service/getServiceCategoryDetail";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";



interface ServiceCategoryState {
    serviceCategory: GetServiceCategoryResponse;
    loadingServiceCategory: boolean;
    errorServiceCategory: string | null;
}

interface ServiceCategoryDetailState {
    serviceCategoryDetail: GetServiceCategoryDetailResponse;
    loadingServiceCategoryDetail: boolean;
    errorServiceCategoryDetail: string | null;
}

const initialState: ServiceCategoryState = {
    serviceCategory: {
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
    loadingServiceCategory: false,
    errorServiceCategory: null,
};
const initialStateDetail: ServiceCategoryDetailState = {
    serviceCategoryDetail: {
        status: false,
        message: "",
        data: {
            id: "",
            name: "",
            description: "",
            icon: "",
            color: "",
            slug: "",
            created_at: "",
            updated_at: "",
        },
    },
    loadingServiceCategoryDetail: false,
    errorServiceCategoryDetail: null,
};

export const fetchServiceCategoryAll = createAsyncThunk(
    "serviceCategory/fetchServiceCategoryAll",
    async () => {
        try {
            const response = await api.get(`/services-categories/all`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch service categories");
        }
    }
);
export const fetchServiceCategory = createAsyncThunk(
    "serviceCategory/fetchServiceCategory",
    async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
        try {
            const response = await api.get(`/services-categories`, {
                params: {
                    pageSize: pageSize || 5,
                    page: page || 1,
                    search: search || "",
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch service categories");
        }
    }
);

export const fetchServiceCategoryDetail = createAsyncThunk(
    "serviceCategory/fetchServiceCategoryDetail",
    async (slug: string) => {
        try {
            const response = await api.get(`/services-categories/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch service category detail");
        }
    }
);

export const createServiceCategory = createAsyncThunk(
    "serviceCategory/createServiceCategory",
    async (data: FormData) => {
        try {
            const response = await api.post(`/services-categories`, data, {
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
            const errorMessage = error.response?.data?.message || "Failed to create permission";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const updateServiceCategory = createAsyncThunk(
    "serviceCategory/updateServiceCategory",
    async ({ id, data }: { id: string; data: FormData }) => {
        try {
            const response = await api.put(`/services-categories/${id}`, data, {
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
            const errorMessage = error.response?.data?.message || "Failed to update service category";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const deleteServiceCategory = createAsyncThunk(
    "serviceCategory/deleteServiceCategory",
    async (ids: string[]) => {
        try {
            const response = await api.delete(`/services-categories`, {
                data: {
                    ids: ids,
                },
            });
            toast({
                title: "Success",
                description: response.data.message,
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to delete service category";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const serviceCategorySlice = createSlice({
    name: "serviceCategory",
    initialState,
    reducers: {
            setPage: (state, action) => {
                state.serviceCategory.meta.current_page = action.payload;
            },
            setPageSize: (state, action) => {
                state.serviceCategory.meta.per_page = action.payload;
            },
            resetRolesState: (state) => {
                state.serviceCategory = initialState.serviceCategory;
                state.loadingServiceCategory = false;
                state.errorServiceCategory = null;
            },
            createroleSuccess: (state, action) => {
                state.serviceCategory.data.push(action.payload.data);
                state.loadingServiceCategory = false;
                state.errorServiceCategory = null;
            }

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchServiceCategoryAll.pending, (state) => {
            state.loadingServiceCategory = true;
            state.errorServiceCategory = null;
        })
        .addCase(fetchServiceCategoryAll.fulfilled, (state, action) => {
            state.loadingServiceCategory = false;
            state.serviceCategory.data = action.payload.data;
            state.serviceCategory.meta = action.payload.meta;
        })
        .addCase(fetchServiceCategoryAll.rejected, (state, action) => {
            state.loadingServiceCategory = false;
            state.errorServiceCategory = action.error.message || "Failed to fetch all service categories";
            toast({
                title: "Error",
                variant: "destructive",
                description: state.errorServiceCategory,
            });
        })
            .addCase(fetchServiceCategory.pending, (state) => {
                state.loadingServiceCategory = true;
                state.errorServiceCategory = null;
            })
            .addCase(fetchServiceCategory.fulfilled, (state, action) => {
                state.loadingServiceCategory = false;
                state.serviceCategory = action.payload;
            })
            .addCase(fetchServiceCategory.rejected, (state, action) => {
                state.loadingServiceCategory = false;
                state.errorServiceCategory = action.error.message || "Failed to fetch service categories";
            })
            .addCase(createServiceCategory.pending, (state) => {
                state.loadingServiceCategory = true;
                state.errorServiceCategory = null;
            })
            .addCase(createServiceCategory.fulfilled, (state, action) => {
                state.loadingServiceCategory = false;
                state.serviceCategory.data.push(action.payload.data);
                state.serviceCategory.meta.total += 1; // Assuming a new category is added
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(createServiceCategory.rejected, (state, action) => {
                state.loadingServiceCategory = false;
                state.errorServiceCategory = action.error.message || "Failed to create service category";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorServiceCategory,
                });
            })
            .addCase(updateServiceCategory.pending, (state) => {
                state.loadingServiceCategory = true;
                state.errorServiceCategory = null;
            })
            .addCase(updateServiceCategory.fulfilled, (state, action) => {
                state.loadingServiceCategory = false;
                const index = state.serviceCategory.data.findIndex(cat => cat.id === action.payload.data.id);
                if (index !== -1) {
                    state.serviceCategory.data[index] = action.payload.data;
                }
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(updateServiceCategory.rejected, (state, action) => {
                state.loadingServiceCategory = false;
                state.errorServiceCategory = action.error.message || "Failed to update service category";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorServiceCategory,
                });
            })
            .addCase(deleteServiceCategory.pending, (state) => {
                state.loadingServiceCategory = true;
                state.errorServiceCategory = null;
            })
            .addCase(deleteServiceCategory.fulfilled, (state, action) => {
                state.loadingServiceCategory = false;
                const deletedIds = action.payload.data.ids;
                state.serviceCategory.data = state.serviceCategory.data.filter(cat => !deletedIds.includes(cat.id));
                state.serviceCategory.meta.total -= deletedIds.length; // Adjust total count
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(deleteServiceCategory.rejected, (state, action) => {
                state.loadingServiceCategory = false;
                state.errorServiceCategory = action.error.message || "Failed to delete service category";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorServiceCategory,
                });
            })
    }
});

export const serviceCategoryDetailSlice = createSlice({
    name: "serviceCategoryDetail",
    initialState: initialStateDetail,
    reducers: {
        resetServiceCategoryDetailState: (state) => {
            state.serviceCategoryDetail = initialStateDetail.serviceCategoryDetail;
            state.loadingServiceCategoryDetail = false;
            state.errorServiceCategoryDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceCategoryDetail.pending, (state) => {
                state.loadingServiceCategoryDetail = true;
                state.errorServiceCategoryDetail = null;
            })
            .addCase(fetchServiceCategoryDetail.fulfilled, (state, action) => {
                state.loadingServiceCategoryDetail = false;
                state.serviceCategoryDetail = action.payload;
            })
            .addCase(fetchServiceCategoryDetail.rejected, (state, action) => {
                state.loadingServiceCategoryDetail = false;
                state.errorServiceCategoryDetail = action.error.message || "Failed to fetch service category detail";
            });
    }
});

export const {reducer: serviceCategoryReducer} = serviceCategorySlice;
export const {reducer: serviceCategoryDetailReducer} = serviceCategoryDetailSlice;
export const { actions: serviceCategoryActions } = serviceCategorySlice;
export const { actions: serviceCategoryDetailActions } = serviceCategoryDetailSlice;

export const selectServiceCategory = (state: { serviceCategory: ServiceCategoryState }) => state.serviceCategory.serviceCategory;
export const selectServiceCategoryLoading = (state: { serviceCategory: ServiceCategoryState }) => state.serviceCategory.loadingServiceCategory;
export const selectServiceCategoryError = (state: { serviceCategory: ServiceCategoryState }) => state.serviceCategory.errorServiceCategory;

export const selectServiceCategoryDetail = (state: { serviceCategoryDetail: ServiceCategoryDetailState }) => state.serviceCategoryDetail.serviceCategoryDetail;
export const selectServiceCategoryDetailLoading = (state: { serviceCategoryDetail: ServiceCategoryDetailState }) => state.serviceCategoryDetail.loadingServiceCategoryDetail;
export const selectServiceCategoryDetailError = (state: { serviceCategoryDetail: ServiceCategoryDetailState }) => state.serviceCategoryDetail.errorServiceCategoryDetail;

export default {
    serviceCategoryReducer: serviceCategorySlice.reducer,
    serviceCategoryDetailReducer: serviceCategoryDetailSlice.reducer,
}

export const {setPage, setPageSize, resetRolesState } = serviceCategorySlice.actions;
export const { resetServiceCategoryDetailState } = serviceCategoryDetailSlice.actions;
