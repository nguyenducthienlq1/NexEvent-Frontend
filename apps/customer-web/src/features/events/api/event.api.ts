import axiosInstance from "@/lib/apiClient";
import type { ApiResponse } from "@/../../packages/types/api";
import type {
  Event,
  EventRequest,
  Page,
} from "@/features/events/types/event.types";

export const eventApi = {
  getAll: (params?: { page?: number; size?: number; sortBy?: string }) =>
    axiosInstance.get<ApiResponse<Page<Event>>>("/events", { params }),

  search: (keyword: string, params?: { page?: number; size?: number }) =>
    axiosInstance.get<ApiResponse<Page<Event>>>("/events/search", {
      params: { keyword, ...params },
    }),

  getById: (id: number) =>
    axiosInstance.get<ApiResponse<Event>>(`/events/${id}`),

  create: (data: EventRequest) =>
    axiosInstance.post<ApiResponse<Event>>("/events", data),

  update: (id: number, data: Partial<EventRequest>) =>
    axiosInstance.patch<ApiResponse<Event>>(`/events/${id}`, data),

  delete: (id: number) => axiosInstance.delete(`/events/${id}`),
};
