import { apiClient } from "../../../lib/apiClient";
import type { Page } from "../../../types/common";
import type { EventItem, EventPayload } from "../types";

export const eventsApi = {
  list: async (params?: { page?: number; size?: number; sortBy?: string }) => {
    const { data } = await apiClient.get<Page<EventItem>>("/events", {
      params,
    });
    return data;
  },
  create: async (payload: EventPayload) => {
    const { data } = await apiClient.post<EventItem>("/events", payload);
    return data;
  },
  update: async (id: number, payload: EventPayload) => {
    const { data } = await apiClient.patch<EventItem>(`/events/${id}`, payload);
    return data;
  },
  delete: async (id: number) => {
    await apiClient.delete(`/events/${id}`);
  },
};
