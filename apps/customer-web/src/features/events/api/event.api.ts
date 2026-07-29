import axiosInstance from "@/lib/apiClient";
import type {
  Event,
  EventRequest,
  Page,
} from "@/features/events/types/event.types";

export const eventApi = {
  getAll: (params?: { page?: number; size?: number; sortBy?: string }) =>
    axiosInstance.get<Page<Event>>("/events", { params }),

  search: (keyword: string, params?: { page?: number; size?: number }) =>
    axiosInstance.get<Page<Event>>("/events/search", {
      params: { keyword, ...params },
    }),

  getById: (id: number) => axiosInstance.get<Event>(`/events/${id}`),

  create: (data: EventRequest) => axiosInstance.post<Event>("/events", data),

  update: (id: number, data: Partial<EventRequest>) =>
    axiosInstance.patch<Event>(`/events/${id}`, data),

  delete: (id: number) => axiosInstance.delete(`/events/${id}`),
};
