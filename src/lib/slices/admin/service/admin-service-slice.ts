import { toast } from "@/components/atoms/use-toast";
import { api, apiAdmin } from "@/lib/axios/instance";
import { GetServiceResponse } from "@/lib/interface/admin/service/getService";
import { GetServiceDetailResponse } from "@/lib/interface/admin/service/getServiceDetail";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface ServiceState {
    service: GetServiceResponse;
    loadingService: boolean;
    errorService: string | null;
}

interface ServiceDetailState {
    serviceDetail: GetServiceDetailResponse;
    loadingServiceDetail: boolean;
    errorServiceDetail: string | null;
}

const initialState: ServiceState = {
    service: {
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
    loadingService: false,
    errorService: null,
};

const initialStateDetail: ServiceDetailState = {
    serviceDetail: {
        status: false,
        message: "",
        data: {
            id: "",
            name: "",
            description: "",
            price: "",
            images: "",
            slug: "",
            duration: 0,
            is_active: 0,
            category_id: "",
            created_at: "",
            updated_at: "",
            category: {
                id: "",
                name: "",
                description: "",
                icon: "",
                color: "",
                slug: "",
                created_at: "",
                updated_at: ""
            }
        }
    },
    loadingServiceDetail: false,
    errorServiceDetail: null,
};

export const fetchServiceAll = createAsyncThunk(
    "service/fetchServiceAll",
    async () => {
        try {
            const response = await api.get("/services/all");
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch service");
        }
    }
);

export const fetchService = createAsyncThunk(
    "service/fetchService",
    async ({ page, pageSize, search }: { page: number; pageSize?: number; search?: string }) => {
        try {
            const response = await api.get(`/services`, {
                params: {
                    pageSize: pageSize || 5,
                    page: page || 1,
                    all: true,
                    search: search || "",
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch services");
        }
    }
);

export const fetchServiceDetail = createAsyncThunk(
    "service/fetchServiceDetail",
    async (slug: string) => {
        try {
            const response = await apiAdmin.get(`/services/${slug}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch service detail");
        }
    }
);

export const createService = createAsyncThunk(
    "service/createService",
    async (data: FormData) => {
        try {
            const response = await apiAdmin.post("/services", data, {
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
            throw new Error(errorMessage || "Failed to create service");
        }
    }
);

export const updateService = createAsyncThunk(
    "service/updateService",
    async ({ id, data }: { id: string; data: FormData }) => {
        try {
            const response = await apiAdmin.put(`/services/${id}`, data, {
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
            const errorMessage = error.response?.data?.message || "Failed to update service";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const updateServiceImage = createAsyncThunk(
    "service/updateServiceImage",
    async ({ id, data }: { id: string; data: FormData }) => {
        try {
            const response = await apiAdmin.put(`/services/image/${id}`, data, {
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
            const errorMessage = error.response?.data?.message || "Failed to update service image";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const deleteService = createAsyncThunk(
    "service/deleteService",
    async (ids: string[]) => {
        try {
            const response = await apiAdmin.delete("/services", {
                data: {
                    ids: ids,
                },
            });
            toast({
                title: "Success",
                description: response.data.message,
            });
            return ids;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to delete service";
            toast({
                title: "Error",
                variant: "destructive",
                description: errorMessage,
            });
            throw new Error(errorMessage);
        }
    }
);

export const serviceSlice = createSlice({
    name: "service",
    initialState: initialState,
    reducers: {
                setPage: (state, action) => {
                    state.service.meta.current_page = action.payload;
                },
                setPageSize: (state, action) => {
                    state.service.meta.per_page = action.payload;
                },
                resetRolesState: (state) => {
                    state.service = initialState.service;
                    state.loadingService = false;
                    state.errorService = null;
                },
                createroleSuccess: (state, action) => {
                    state.service.data.push(action.payload.data);
                    state.loadingService = false;
                    state.errorService = null;
                }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceAll.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(fetchServiceAll.fulfilled, (state, action) => {
                state.loadingService = false;
                state.service = action.payload;
            })
            .addCase(fetchServiceAll.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to fetch services";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            })
            .addCase(fetchService.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                state.loadingService = false;
                state.service = action.payload;
            })
            .addCase(fetchService.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to fetch services";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            })
            .addCase(createService.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loadingService = false;
                state.service.data.push(action.payload.data);
                state.service.meta.total += 1; // Update total count
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(createService.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to create service";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            })
            .addCase(updateService.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.loadingService = false;
                const index = state.service.data.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.service.data[index] = action.payload.data; // Update the existing service
                }
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(updateService.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to update service";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            })
            .addCase(updateServiceImage.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(updateServiceImage.fulfilled, (state, action) => {
                state.loadingService = false;
                const index = state.service.data.findIndex((item) => item.id === action.payload.data.id);
                if (index !== -1) {
                    state.service.data[index].images = action.payload.data.images; // Update the service image
                }
                toast({
                    title: "Success",
                    description: action.payload.message,
                });
            })
            .addCase(updateServiceImage.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to update service image";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            })
            .addCase(deleteService.pending, (state) => {
                state.loadingService = true;
                state.errorService = null;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loadingService = false;
                state.service.data = state.service.data.filter((item) => !action.payload.includes(item.id));
                state.service.meta.total -= action.payload.length; // Update total count
                toast({
                    title: "Success",
                    description: "Services deleted successfully",
                });
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loadingService = false;
                state.errorService = action.error.message || "Failed to delete service";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorService,
                });
            });
    },
});

export const serviceDetailSlice = createSlice({
    name: "serviceDetail",
    initialState: initialStateDetail,
    reducers: {
        resetServiceDetailState: (state) => {
            state.serviceDetail = initialStateDetail.serviceDetail;
            state.loadingServiceDetail = false;
            state.errorServiceDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceDetail.pending, (state) => {
                state.loadingServiceDetail = true;
                state.errorServiceDetail = null;
            })
            .addCase(fetchServiceDetail.fulfilled, (state, action) => {
                state.loadingServiceDetail = false;
                state.serviceDetail = action.payload;
            })
            .addCase(fetchServiceDetail.rejected, (state, action) => {
                state.loadingServiceDetail = false;
                state.errorServiceDetail = action.error.message || "Failed to fetch service detail";
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: state.errorServiceDetail,
                });
            });
    },
});

export const {reducer: serviceReducer} = serviceSlice;
export const {reducer: serviceDetailReducer} = serviceDetailSlice;
export const {actions: serviceActions} = serviceSlice;
export const {actions: serviceDetailActions} = serviceDetailSlice;

export const selectService = (state: { service: ServiceState }) => state.service.service;
export const selectServiceDetail = (state: { serviceDetail: ServiceDetailState }) => state.serviceDetail.serviceDetail;

export const selectLoadingService = (state: { service: ServiceState }) => state.service.loadingService;
export const selectErrorService = (state: { service: ServiceState }) => state.service.errorService;

export const selectLoadingServiceDetail = (state: { serviceDetail: ServiceDetailState }) => state.serviceDetail.loadingServiceDetail;
export const selectErrorServiceDetail = (state: { serviceDetail: ServiceDetailState }) => state.serviceDetail.errorServiceDetail;

export default {
    serviceReducer: serviceSlice.reducer,
    serviceDetailReducer: serviceDetailSlice.reducer,
}

export const {
    setPage,
    setPageSize,
    resetRolesState,
    createroleSuccess
} = serviceSlice.actions;
export const {
    resetServiceDetailState
} = serviceDetailSlice.actions;
